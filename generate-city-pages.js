const fs = require('fs');
const path = require('path');

const CITIES = [
  { slug:'anaheim', name:'Anaheim', county:'Orange County', lat:'33.8353', lon:'-117.9145', streets:'Lincoln Ave, Harbor Blvd, Katella Ave, Ball Rd, SR-57, SR-91', crashes:'4,200+', hospitals:'CHOC, UCI Medical Center, Anaheim Regional Medical Center', court:'Orange County Superior Court — Central Justice Center, 700 Civic Center Dr W, Santa Ana CA 92701', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'apple-valley', name:'Apple Valley', county:'San Bernardino County', lat:'34.5008', lon:'-117.1859', streets:'Apple Valley Rd, Dale Evans Pkwy, Navajo Rd, US-18, Bear Valley Rd, Stoddard Wells Rd', crashes:'1,400+', hospitals:'Desert Valley Hospital (Victorville), St. Mary Medical Center (Apple Valley)', court:'Victorville Court — 14455 Civic Dr, Victorville CA 92392', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'azusa', name:'Azusa', county:'Los Angeles County', lat:'34.1336', lon:'-117.9076', streets:'Foothill Blvd, Azusa Ave, SR-39, San Gabriel Canyon Rd, Arrow Hwy, Alosta Ave', crashes:'1,200+', hospitals:'Azusa InterCommunity Hospital, Citrus Valley Medical Center (Covina)', court:'LA County Superior Court — Pomona Courthouse, 400 Civic Center Plaza, Pomona CA 91766', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'banning', name:'Banning', county:'Riverside County', lat:'33.9253', lon:'-116.8763', streets:'Ramsey St, Hargrave St, Highland Springs Ave, I-10, 8th St, SR-243', crashes:'900+', hospitals:'San Gorgonio Memorial Hospital (Banning), Desert Regional Medical Center (Palm Springs)', court:'Riverside County Superior Court — Banning Justice Center, 311 E Ramsey St, Banning CA 92220', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'beaumont', name:'Beaumont', county:'Riverside County', lat:'33.9294', lon:'-116.9770', streets:'Beaumont Ave, 6th St, Highland Springs Ave, I-10, SR-60, Oak Valley Pkwy', crashes:'950+', hospitals:'Beaver Medical Group Beaumont, San Gorgonio Memorial Hospital', court:'Riverside County Superior Court — Banning Justice Center, 311 E Ramsey St, Banning CA 92220', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'bloomington', name:'Bloomington', county:'San Bernardino County', lat:'34.0661', lon:'-117.3967', streets:'Cedar Ave, Slover Ave, Valley Blvd, Locust Ave, I-10, Santa Ana Ave', crashes:'800+', hospitals:'Arrowhead Regional Medical Center (Colton), Kaiser Fontana Medical Center', court:'San Bernardino Justice Center, 247 W 3rd St, San Bernardino CA 92415', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'burbank', name:'Burbank', county:'Los Angeles County', lat:'34.1808', lon:'-118.3090', streets:'Victory Blvd, Glenoaks Blvd, Hollywood Way, I-5, SR-134, San Fernando Blvd', crashes:'2,800+', hospitals:'Providence Saint Joseph Medical Center Burbank, USC Verdugo Hills Hospital', court:'LA County Superior Court — Burbank Courthouse, 300 E Olive Ave, Burbank CA 91502', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'chino', name:'Chino', county:'San Bernardino County', lat:'34.0122', lon:'-117.6889', streets:'Central Ave, Riverside Dr, Schaefer Ave, Edison Ave, SR-60, Euclid Ave (SR-83)', crashes:'2,000+', hospitals:'Chino Valley Medical Center, San Antonio Regional Hospital (Upland)', court:'West Valley Courthouse, 8303 Haven Ave, Rancho Cucamonga CA 91730', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'chino-hills', name:'Chino Hills', county:'San Bernardino County', lat:'33.9939', lon:'-117.7326', streets:'Peyton Dr, Pipeline Ave, Chino Hills Pkwy, Carbon Canyon Rd (SR-142), Soquel Canyon Pkwy, SR-71', crashes:'1,500+', hospitals:'Chino Valley Medical Center, Pomona Valley Hospital Medical Center', court:'West Valley Courthouse, 8303 Haven Ave, Rancho Cucamonga CA 91730', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'claremont', name:'Claremont', county:'Los Angeles County', lat:'34.0967', lon:'-117.7198', streets:'Foothill Blvd, Indian Hill Blvd, Baseline Rd, Monte Vista Ave, I-10, Arrow Hwy', crashes:'900+', hospitals:'San Antonio Regional Hospital (Upland), Pomona Valley Hospital Medical Center', court:'West Valley Courthouse, 8303 Haven Ave, Rancho Cucamonga CA 91730', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'colton', name:'Colton', county:'San Bernardino County', lat:'34.0739', lon:'-117.3136', streets:'Mount Vernon Ave, Valley Blvd, La Cadena Dr, I-10, I-215, SR-66 (Rialto Ave)', crashes:'1,600+', hospitals:'Arrowhead Regional Medical Center (Level II Trauma), Community Hospital of San Bernardino', court:'San Bernardino Justice Center, 247 W 3rd St, San Bernardino CA 92415', office:'2627 S Waterman Ave Suite D, San Bernardino CA 92408', officecity:'San Bernardino', officezip:'92408', mapsq:'2627+S+Waterman+Ave+Suite+D+San+Bernardino+CA+92408', lat2:'34.0965', lon2:'-117.2770' },
  { slug:'compton', name:'Compton', county:'Los Angeles County', lat:'33.8958', lon:'-118.2201', streets:'Rosecrans Ave, Compton Blvd, Long Beach Blvd, Central Ave, I-110, I-105', crashes:'2,600+', hospitals:'MLK Community Hospital (Willowbrook), Adventist Health White Memorial', court:'LA County Superior Court — Compton Courthouse, 200 W Compton Blvd, Compton CA 90220', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'corona', name:'Corona', county:'Riverside County', lat:'33.8753', lon:'-117.5664', streets:'Lincoln Ave, Ontario Ave, Magnolia Ave, Main St, SR-91, I-15, SR-71', crashes:'3,800+', hospitals:'Corona Regional Medical Center, Riverside University Health System', court:'Riverside County Superior Court — Southwest Justice Center, 30755-D Auld Rd, Murrieta CA 92563', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'covina', name:'Covina', county:'Los Angeles County', lat:'34.0900', lon:'-117.8903', streets:'Citrus Ave, Badillo St, Azusa Ave, I-10, Arrow Hwy, San Bernardino Rd', crashes:'1,300+', hospitals:'Citrus Valley Medical Center — Covina Campus, USC Arcadia Hospital', court:'LA County Superior Court — Pomona Courthouse, 400 Civic Center Plaza, Pomona CA 91766', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'diamond-bar', name:'Diamond Bar', county:'Los Angeles County', lat:'34.0286', lon:'-117.8103', streets:'Diamond Bar Blvd, Grand Ave, Brea Canyon Rd, SR-57, SR-60, Golden Springs Dr', crashes:'1,600+', hospitals:'Pomona Valley Hospital Medical Center, Foothill Presbyterian Hospital', court:'LA County Superior Court — Pomona Courthouse, 400 Civic Center Plaza, Pomona CA 91766', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'downey', name:'Downey', county:'Los Angeles County', lat:'33.9401', lon:'-118.1331', streets:'Firestone Blvd, Lakewood Blvd, Paramount Blvd, Florence Ave, I-5, I-605', crashes:'3,100+', hospitals:'PIH Health Hospital Downey, Rancho Los Amigos National Rehabilitation Center', court:'LA County Superior Court — Norwalk Courthouse, 12720 Norwalk Blvd, Norwalk CA 90650', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'el-monte', name:'El Monte', county:'Los Angeles County', lat:'34.0686', lon:'-118.0276', streets:'Garvey Ave, Valley Blvd, Peck Rd, I-10, SR-60, Rosemead Blvd', crashes:'2,400+', hospitals:'Emanate Health Queen of the Valley, USC Arcadia Hospital', court:'LA County Superior Court — El Monte Courthouse, 11234 E Valley Blvd, El Monte CA 91731', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'escondido', name:'Escondido', county:'San Diego County', lat:'33.1192', lon:'-117.0864', streets:'Valley Pkwy, Centre City Pkwy, El Norte Pkwy, I-15, SR-78, Citracado Pkwy', crashes:'2,900+', hospitals:'Palomar Medical Center Escondido (Level II Trauma), Kaiser Permanente Escondido', court:'San Diego Superior Court — North County Regional Center, 325 S Melrose Dr, Vista CA 92081', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'fullerton', name:'Fullerton', county:'Orange County', lat:'33.8704', lon:'-117.9243', streets:'Commonwealth Ave, Harbor Blvd, Imperial Hwy, Yorba Linda Blvd, SR-57, SR-91', crashes:'2,700+', hospitals:'St. Jude Medical Center, CHOC, UCI Medical Center', court:'Orange County Superior Court — North Justice Center, 1275 N Berkeley Ave, Fullerton CA 92832', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'garden-grove', name:'Garden Grove', county:'Orange County', lat:'33.7743', lon:'-117.9379', streets:'Garden Grove Blvd, Brookhurst St, Harbor Blvd, Trask Ave, SR-22, I-5', crashes:'2,500+', hospitals:'Garden Grove Hospital and Medical Center, UCI Medical Center', court:'Orange County Superior Court — Central Justice Center, 700 Civic Center Dr W, Santa Ana CA 92701', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'glendale', name:'Glendale', county:'Los Angeles County', lat:'34.1425', lon:'-118.2551', streets:'Colorado St, Brand Blvd, Central Ave, San Fernando Rd, I-5, SR-2, SR-134', crashes:'3,200+', hospitals:'Glendale Memorial Hospital, USC Verdugo Hills Hospital', court:'LA County Superior Court — Glendale Courthouse, 600 E Broadway, Glendale CA 91206', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'glendora', name:'Glendora', county:'Los Angeles County', lat:'34.1361', lon:'-117.8653', streets:'Foothill Blvd, Grand Ave, Glendora Ave, I-210, SR-39, Alosta Ave', crashes:'1,100+', hospitals:'Glendora Community Hospital, Citrus Valley Medical Center', court:'LA County Superior Court — Pomona Courthouse, 400 Civic Center Plaza, Pomona CA 91766', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'hemet', name:'Hemet', county:'Riverside County', lat:'33.7475', lon:'-116.9719', streets:'Florida Ave, Sanderson Ave, Stetson Ave, Lyon Ave, SR-74, SR-79', crashes:'1,800+', hospitals:'Hemet Valley Medical Center, Inland Valley Medical Center (Wildomar)', court:'Riverside County Superior Court — Southwest Justice Center, 30755-D Auld Rd, Murrieta CA 92563', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'hesperia', name:'Hesperia', county:'San Bernardino County', lat:'34.4264', lon:'-117.3009', streets:'Main St, Bear Valley Rd, Eucalyptus Ave, Peach Ave, I-15, US-395', crashes:'1,600+', hospitals:'Desert Valley Hospital (Victorville), Victor Valley Global Medical Center', court:'Victorville Court — 14455 Civic Dr, Victorville CA 92392', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'highland', name:'Highland', county:'San Bernardino County', lat:'34.1281', lon:'-117.2086', streets:'Highland Ave, Base Line St, Boulder Ave, Palm Ave, SR-30 / SR-210, Tippecanoe Ave', crashes:'1,200+', hospitals:'St. Bernardine Medical Center, Loma Linda University Medical Center (Level I Trauma)', court:'San Bernardino Justice Center, 247 W 3rd St, San Bernardino CA 92415', office:'2627 S Waterman Ave Suite D, San Bernardino CA 92408', officecity:'San Bernardino', officezip:'92408', mapsq:'2627+S+Waterman+Ave+Suite+D+San+Bernardino+CA+92408', lat2:'34.0965', lon2:'-117.2770' },
  { slug:'indio', name:'Indio', county:'Riverside County', lat:'33.7206', lon:'-116.2156', streets:'Indio Blvd, Monroe St, Jefferson St, Jackson St, I-10, SR-111', crashes:'1,700+', hospitals:'Eisenhower Health (Rancho Mirage), JFK Memorial Hospital (Indio)', court:'Riverside County Superior Court — Larson Justice Center, 46200 Oasis St, Indio CA 92201', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'inglewood', name:'Inglewood', county:'Los Angeles County', lat:'33.9617', lon:'-118.3531', streets:'Manchester Ave, Century Blvd, Crenshaw Blvd, La Brea Ave, I-405, I-105', crashes:'3,400+', hospitals:'Centinela Hospital Medical Center, Cedars-Sinai Marina del Rey', court:'LA County Superior Court — Inglewood Courthouse, One Regent St, Inglewood CA 90301', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'irvine', name:'Irvine', county:'Orange County', lat:'33.6839', lon:'-117.7947', streets:'Jamboree Rd, Jeffrey Rd, Sand Canyon Ave, Culver Dr, I-405, I-5, SR-133', crashes:'3,000+', hospitals:'Hoag Hospital Irvine, UCI Medical Center, CHOC — Mission Viejo Campus', court:'Orange County Superior Court — Harbor Justice Center, 4601 Jamboree Rd, Newport Beach CA 92660', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'jurupa-valley', name:'Jurupa Valley', county:'Riverside County', lat:'33.9969', lon:'-117.4864', streets:'Mission Blvd (SR-60), Van Buren Blvd, Jurupa Ave, Limonite Ave, SR-60, I-15', crashes:'2,200+', hospitals:'Kaiser Permanente Fontana, Riverside University Health System', court:'Riverside County Superior Court — Riverside Historic Courthouse, 4050 Main St, Riverside CA 92501', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'la-verne', name:'La Verne', county:'Los Angeles County', lat:'34.1008', lon:'-117.7678', streets:'Foothill Blvd, D St, White Ave, I-210, Arrow Hwy, Baseline Rd', crashes:'700+', hospitals:'San Antonio Regional Hospital (Upland), Pomona Valley Hospital Medical Center', court:'LA County Superior Court — Pomona Courthouse, 400 Civic Center Plaza, Pomona CA 91766', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'lake-elsinore', name:'Lake Elsinore', county:'Riverside County', lat:'33.6681', lon:'-117.3273', streets:'Central Ave, Grape St, Collier Ave, Mission Trail, SR-74, I-15', crashes:'1,400+', hospitals:'Inland Valley Medical Center (Wildomar), Menifee Valley Medical Center', court:'Riverside County Superior Court — Southwest Justice Center, 30755-D Auld Rd, Murrieta CA 92563', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'lancaster', name:'Lancaster', county:'Los Angeles County', lat:'34.6867', lon:'-118.1542', streets:'10th St W, Lancaster Blvd, 20th St W, Sierra Hwy, SR-14, Avenue J', crashes:'2,800+', hospitals:'Antelope Valley Hospital (Level II Trauma), Kaiser Permanente Antelope Valley', court:'LA County Superior Court — Lancaster Courthouse, 42011 4th St W, Lancaster CA 93534', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'loma-linda', name:'Loma Linda', county:'San Bernardino County', lat:'34.0483', lon:'-117.2611', streets:'Anderson St, Barton Rd, Mountain View Ave, Stewart St, I-10, Tippecanoe Ave', crashes:'800+', hospitals:'Loma Linda University Medical Center (Level I Trauma), VA Loma Linda Healthcare System', court:'San Bernardino Justice Center, 247 W 3rd St, San Bernardino CA 92415', office:'2627 S Waterman Ave Suite D, San Bernardino CA 92408', officecity:'San Bernardino', officezip:'92408', mapsq:'2627+S+Waterman+Ave+Suite+D+San+Bernardino+CA+92408', lat2:'34.0965', lon2:'-117.2770' },
  { slug:'long-beach', name:'Long Beach', county:'Los Angeles County', lat:'33.7701', lon:'-118.1937', streets:'Pacific Coast Hwy, Atlantic Ave, Long Beach Blvd, Lakewood Blvd, I-405, I-710', crashes:'5,500+', hospitals:'Long Beach Medical Center (Level II Trauma), Memorial Hospital at Long Beach', court:'LA County Superior Court — Long Beach Courthouse, 275 Magnolia Ave, Long Beach CA 90802', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'los-angeles', name:'Los Angeles', county:'Los Angeles County', lat:'34.0522', lon:'-118.2437', streets:'Wilshire Blvd, Vermont Ave, Figueroa St, Sunset Blvd, I-405, I-10, US-101', crashes:'15,000+', hospitals:'LAC+USC Medical Center (Level I Trauma), Cedars-Sinai Medical Center, Ronald Reagan UCLA', court:'LA County Superior Court — Stanley Mosk Courthouse, 111 N Hill St, Los Angeles CA 90012', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'menifee', name:'Menifee', county:'Riverside County', lat:'33.6971', lon:'-117.1850', streets:'Newport Rd, Haun Rd, McCall Blvd, Bradley Rd, I-215, Scott Rd', crashes:'1,800+', hospitals:'Menifee Valley Medical Center, Inland Valley Medical Center (Wildomar)', court:'Riverside County Superior Court — Southwest Justice Center, 30755-D Auld Rd, Murrieta CA 92563', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'montclair', name:'Montclair', county:'San Bernardino County', lat:'34.0775', lon:'-117.6897', streets:'Central Ave, Benson Ave, Holt Blvd, Monte Vista Ave, I-10, Arrow Hwy', crashes:'1,000+', hospitals:'San Antonio Regional Hospital (Upland), Chino Valley Medical Center', court:'West Valley Courthouse, 8303 Haven Ave, Rancho Cucamonga CA 91730', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'moreno-valley', name:'Moreno Valley', county:'Riverside County', lat:'33.9425', lon:'-117.2297', streets:'Alessandro Blvd, Perris Blvd, Cactus Ave, Pigeon Pass Rd, SR-60, Frederick St', crashes:'4,000+', hospitals:'Riverside University Health System Medical Center (Level II Trauma), Desert Regional Medical Center', court:'Riverside County Superior Court — Riverside Historic Courthouse, 4050 Main St, Riverside CA 92501', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'murrieta', name:'Murrieta', county:'Riverside County', lat:'33.5539', lon:'-117.2139', streets:'Murrieta Hot Springs Rd, Clinton Keith Rd, Jefferson Ave, Washington Ave, I-15, I-215', crashes:'2,600+', hospitals:'Loma Linda University Medical Center Murrieta, Southwest Healthcare System', court:'Riverside County Superior Court — Southwest Justice Center, 30755-D Auld Rd, Murrieta CA 92563', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'norco', name:'Norco', county:'Riverside County', lat:'33.9311', lon:'-117.5486', streets:'Hamner Ave, 6th St, Cota St, Temescal Rd, I-15, Second St', crashes:'800+', hospitals:'Corona Regional Medical Center, Riverside University Health System', court:'Riverside County Superior Court — Southwest Justice Center, 30755-D Auld Rd, Murrieta CA 92563', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'ontario', name:'Ontario', county:'San Bernardino County', lat:'34.0633', lon:'-117.6509', streets:'Holt Blvd, Euclid Ave, Grove Ave, 4th St, I-10, I-15, SR-60', crashes:'4,500+', hospitals:'Kaiser Permanente Ontario Medical Center, San Antonio Regional Hospital (Upland)', court:'West Valley Courthouse, 8303 Haven Ave, Rancho Cucamonga CA 91730', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'orange', name:'Orange', county:'Orange County', lat:'33.7877', lon:'-117.8531', streets:'Chapman Ave, Tustin St, Katella Ave, Lincoln Ave, SR-55, SR-57', crashes:'2,400+', hospitals:'CHOC — Children\'s Hospital of Orange County, UCI Medical Center', court:'Orange County Superior Court — Central Justice Center, 700 Civic Center Dr W, Santa Ana CA 92701', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'palmdale', name:'Palmdale', county:'Los Angeles County', lat:'34.5794', lon:'-118.1165', streets:'Palmdale Blvd, 10th St W, Sierra Hwy, Avenue S, SR-14, Rancho Vista Blvd', crashes:'2,600+', hospitals:'Antelope Valley Hospital (Level II Trauma), Palmdale Regional Medical Center', court:'LA County Superior Court — Palmdale Courthouse, 38256 Sierra Hwy, Palmdale CA 93550', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'palm-springs', name:'Palm Springs', county:'Riverside County', lat:'33.8303', lon:'-116.5453', streets:'Palm Canyon Dr, Indian Canyon Dr, Ramon Rd, Gene Autry Trail, I-10, SR-111', crashes:'1,600+', hospitals:'Desert Regional Medical Center (Level II Trauma), Eisenhower Health', court:'Riverside County Superior Court — Larson Justice Center, 46200 Oasis St, Indio CA 92201', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'pasadena', name:'Pasadena', county:'Los Angeles County', lat:'34.1478', lon:'-118.1445', streets:'Colorado Blvd, Fair Oaks Ave, Lake Ave, Foothill Blvd, I-210, SR-134', crashes:'2,800+', hospitals:'Huntington Hospital (Level II Trauma), USC Arcadia Hospital', court:'LA County Superior Court — Pasadena Courthouse, 300 E Walnut St, Pasadena CA 91101', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'perris', name:'Perris', county:'Riverside County', lat:'33.7825', lon:'-117.2286', streets:'Perris Blvd, Ethanac Rd, Case Rd, Indian Ave, I-215, Ramona Expressway', crashes:'1,500+', hospitals:'Riverside University Health System, Menifee Valley Medical Center', court:'Riverside County Superior Court — Southwest Justice Center, 30755-D Auld Rd, Murrieta CA 92563', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'pomona', name:'Pomona', county:'Los Angeles County', lat:'34.0553', lon:'-117.7500', streets:'Holt Ave, Foothill Blvd, Garey Ave, Orange Grove Ave, SR-57, SR-60, I-10', crashes:'3,400+', hospitals:'Pomona Valley Hospital Medical Center, Casa Colina Hospital', court:'LA County Superior Court — Pomona Courthouse, 400 Civic Center Plaza, Pomona CA 91766', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'redlands', name:'Redlands', county:'San Bernardino County', lat:'34.0556', lon:'-117.1825', streets:'Alabama St, Lugonia Ave, Citrus Ave, Redlands Blvd, I-10, SR-30', crashes:'1,500+', hospitals:'Loma Linda University Medical Center (Level I Trauma), Redlands Community Hospital', court:'San Bernardino Justice Center, 247 W 3rd St, San Bernardino CA 92415', office:'2627 S Waterman Ave Suite D, San Bernardino CA 92408', officecity:'San Bernardino', officezip:'92408', mapsq:'2627+S+Waterman+Ave+Suite+D+San+Bernardino+CA+92408', lat2:'34.0965', lon2:'-117.2770' },
  { slug:'riverside', name:'Riverside', county:'Riverside County', lat:'33.9806', lon:'-117.3755', streets:'University Ave, Chicago Ave, Van Buren Blvd, Arlington Ave, I-215, SR-91, SR-60', crashes:'5,200+', hospitals:'Riverside University Health System Medical Center (Level II Trauma), Riverside Community Hospital', court:'Riverside County Superior Court — Historic Courthouse, 4050 Main St, Riverside CA 92501', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'san-bernardino', name:'San Bernardino', county:'San Bernardino County', lat:'34.1083', lon:'-117.2898', streets:'E Street, Highland Ave, Waterman Ave, Baseline St, I-215, I-10, SR-210', crashes:'5,800+', hospitals:'Arrowhead Regional Medical Center (Level II Trauma), St. Bernardine Medical Center, Loma Linda University Medical Center', court:'San Bernardino Justice Center, 247 W 3rd St, San Bernardino CA 92415', office:'2627 S Waterman Ave Suite D, San Bernardino CA 92408', officecity:'San Bernardino', officezip:'92408', mapsq:'2627+S+Waterman+Ave+Suite+D+San+Bernardino+CA+92408', lat2:'34.0965', lon2:'-117.2770' },
  { slug:'san-dimas', name:'San Dimas', county:'Los Angeles County', lat:'34.1067', lon:'-117.8067', streets:'Arrow Hwy, Bonita Ave, Foothill Blvd, San Dimas Ave, I-210, SR-57', crashes:'700+', hospitals:'San Dimas Community Hospital, Pomona Valley Hospital Medical Center', court:'LA County Superior Court — Pomona Courthouse, 400 Civic Center Plaza, Pomona CA 91766', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'san-marcos', name:'San Marcos', county:'San Diego County', lat:'33.1434', lon:'-117.1661', streets:'Grand Ave, Las Posas Rd, Rancho Santa Fe Rd, SR-78, Palomar Airport Rd, Twin Oaks Valley Rd', crashes:'1,800+', hospitals:'Palomar Medical Center Escondido, Tri-City Medical Center (Oceanside)', court:'San Diego Superior Court — North County Regional Center, 325 S Melrose Dr, Vista CA 92081', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'santa-ana', name:'Santa Ana', county:'Orange County', lat:'33.7455', lon:'-117.8677', streets:'Bristol St, 17th St, Main St, First St, I-5, SR-22, SR-55', crashes:'4,400+', hospitals:'Orange County Global Medical Center, Children\'s Hospital of Orange County (CHOC)', court:'Orange County Superior Court — Central Justice Center, 700 Civic Center Dr W, Santa Ana CA 92701', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'santa-clarita', name:'Santa Clarita', county:'Los Angeles County', lat:'34.3917', lon:'-118.5426', streets:'Magic Mountain Pkwy, Bouquet Canyon Rd, Golden Valley Rd, I-5, SR-14, Lyons Ave', crashes:'2,400+', hospitals:'Henry Mayo Newhall Hospital, Providence Holy Cross Medical Center', court:'LA County Superior Court — San Fernando Courthouse, 900 3rd St, San Fernando CA 91340', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'temecula', name:'Temecula', county:'Riverside County', lat:'33.4936', lon:'-117.1484', streets:'Winchester Rd, Rancho California Rd, Margarita Rd, Ynez Rd, I-15, SR-79', crashes:'3,000+', hospitals:'Temecula Valley Hospital, Southwest Healthcare System Rancho Springs', court:'Riverside County Superior Court — Southwest Justice Center, 30755-D Auld Rd, Murrieta CA 92563', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'torrance', name:'Torrance', county:'Los Angeles County', lat:'33.8358', lon:'-118.3406', streets:'Hawthorne Blvd, Crenshaw Blvd, Sepulveda Blvd, PCH, I-405, I-110', crashes:'3,500+', hospitals:'Torrance Memorial Medical Center, Providence Little Company of Mary', court:'LA County Superior Court — Torrance Courthouse, 825 Maple Ave, Torrance CA 90503', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'upland', name:'Upland', county:'San Bernardino County', lat:'34.0975', lon:'-117.6484', streets:'Euclid Ave, Foothill Blvd, Central Ave, San Antonio Ave, I-10, SR-210', crashes:'1,800+', hospitals:'San Antonio Regional Hospital, Pomona Valley Hospital Medical Center', court:'West Valley Courthouse, 8303 Haven Ave, Rancho Cucamonga CA 91730', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'victorville', name:'Victorville', county:'San Bernardino County', lat:'34.5361', lon:'-117.2928', streets:'Bear Valley Rd, 7th St, Hook Blvd, Mojave Dr, I-15, US-395', crashes:'2,800+', hospitals:'Desert Valley Hospital, Victor Valley Global Medical Center', court:'Victorville Court — 14455 Civic Dr, Victorville CA 92392', office:'7337 East Ave Suite E, Fontana CA 92336', officecity:'Fontana', officezip:'92336', mapsq:'7337+East+Ave+Suite+E+Fontana+CA+92336', lat2:'34.1207', lon2:'-117.5153' },
  { slug:'west-covina', name:'West Covina', county:'Los Angeles County', lat:'34.0686', lon:'-117.9390', streets:'Garvey Ave, Valley Blvd, Azusa Ave, Sunset Ave, I-10, SR-60', crashes:'2,100+', hospitals:'Emanate Health Queen of the Valley, Citrus Valley Medical Center', court:'LA County Superior Court — Pomona Courthouse, 400 Civic Center Plaza, Pomona CA 91766', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'whittier', name:'Whittier', county:'Los Angeles County', lat:'33.9792', lon:'-118.0328', streets:'Whittier Blvd, Greenleaf Ave, Norwalk Blvd, Washington Blvd, I-605, SR-72', crashes:'2,000+', hospitals:'PIH Health Hospital Whittier, Presbyterian Intercommunity Hospital', court:'LA County Superior Court — Whittier Courthouse, 7339 S Painter Ave, Whittier CA 90602', office:'500 East E Street, Ontario CA 91764', officecity:'Ontario', officezip:'91764', mapsq:'500+East+E+Street+Ontario+CA+91764', lat2:'34.0633', lon2:'-117.6509' },
  { slug:'yucaipa', name:'Yucaipa', county:'San Bernardino County', lat:'34.0336', lon:'-117.0431', streets:'Yucaipa Blvd, Oak Glen Rd, Calimesa Blvd, Bryant St, I-10, SR-38', crashes:'900+', hospitals:'Loma Linda University Medical Center (Level I Trauma), Redlands Community Hospital', court:'San Bernardino Justice Center, 247 W 3rd St, San Bernardino CA 92415', office:'2627 S Waterman Ave Suite D, San Bernardino CA 92408', officecity:'San Bernardino', officezip:'92408', mapsq:'2627+S+Waterman+Ave+Suite+D+San+Bernardino+CA+92408', lat2:'34.0965', lon2:'-117.2770' },
];

// Skip already-created pages
const SKIP = ['fontana','rialto','rancho-cucamonga'];

function buildPage(c) {
  const streetList = c.streets.split(', ').map(s=>`<span class="tag">${s}</span>`).join('\n      ');
  const hospitalRows = c.hospitals.split(', ').map((h,i)=>`<tr><td><strong>${h}</strong></td><td>${i===0?'<span class="tag-highlight">Nearest to '+c.name+'</span>':''}</td></tr>`).join('\n        ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Car Accident Lawyer ${c.name} CA | Gonzales Law Offices — Free 24/7 Consultation</title>
  <meta name="description" content="Injured in a car accident in ${c.name}, CA? Gonzales Law Offices — led by Mark Gonzales, Esq. (CA Bar #249340) — serves ${c.streets.split(', ').slice(0,3).join(', ')} &amp; all ${c.name} roads. $100M+ recovered. No fee unless we win. Call 1-888-232-2898." />
  <meta name="keywords" content="car accident lawyer ${c.name} CA, car accident attorney ${c.name}, personal injury lawyer ${c.name} California, ${c.name} accident attorney, best car accident lawyer ${c.name}, Gonzales Law Offices ${c.name}, Mark Gonzales attorney ${c.name}" />
  <link rel="canonical" href="https://links.gonzaleslawoffices.com/${c.slug}-car-accident-lawyer/" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <meta property="og:title" content="Car Accident Lawyer ${c.name} CA | Gonzales Law Offices" />
  <meta property="og:description" content="Top-rated car accident lawyer in ${c.name}, CA. Mark Gonzales, Esq. $100M+ recovered. Free 24/7 consultation. No fee unless we win." />
  <meta property="og:url" content="https://links.gonzaleslawoffices.com/${c.slug}-car-accident-lawyer/" />
  <meta property="og:image" content="https://links.gonzaleslawoffices.com/logo.jpg" />
  <meta property="og:type" content="website" />
  <meta name="geo.region" content="US-CA" />
  <meta name="geo.placename" content="${c.name}, California" />
  <meta name="geo.position" content="${c.lat};${c.lon}" />
  <meta name="ICBM" content="${c.lat}, ${c.lon}" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness","LegalService","Attorney"],
        "@id": "https://www.gonzaleslawoffices.com/#office-${c.slug}",
        "name": "Gonzales Law Offices — Car Accident Lawyer ${c.name} CA",
        "url": "https://links.gonzaleslawoffices.com/${c.slug}-car-accident-lawyer/",
        "telephone": "+18882322898",
        "openingHours": "Mo-Su 00:00-23:59",
        "priceRange": "Free Consultation — No Fee Unless We Win",
        "address": {"@type":"PostalAddress","streetAddress":"${c.office.split(',')[0]}","addressLocality":"${c.officecity}","addressRegion":"CA","postalCode":"${c.officezip}","addressCountry":"US"},
        "geo": {"@type":"GeoCoordinates","latitude":"${c.lat}","longitude":"${c.lon}"},
        "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"202","bestRating":"5"},
        "areaServed": {"@type":"City","name":"${c.name}","containedInPlace":{"@type":"AdministrativeArea","name":"${c.county}, California"}},
        "sameAs": ["https://www.gonzaleslawoffices.com/","https://www.yelp.com/biz/gonzales-law-offices-fontana"]
      },
      {
        "@type": "WebPage",
        "name": "Car Accident Lawyer ${c.name} CA — Gonzales Law Offices",
        "url": "https://links.gonzaleslawoffices.com/${c.slug}-car-accident-lawyer/",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type":"ListItem","position":1,"name":"Gonzales Law Offices","item":"https://www.gonzaleslawoffices.com/"},
            {"@type":"ListItem","position":2,"name":"Car Accident Lawyer Near Me","item":"https://links.gonzaleslawoffices.com/"},
            {"@type":"ListItem","position":3,"name":"Car Accident Lawyer ${c.name} CA","item":"https://links.gonzaleslawoffices.com/${c.slug}-car-accident-lawyer/"}
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"Who is the best car accident lawyer in ${c.name} CA?","acceptedAnswer":{"@type":"Answer","text":"Gonzales Law Offices, led by Mark Gonzales, Esq. (CA Bar #249340), is rated the top car accident law firm serving ${c.name}. 4.9 stars · 202+ reviews · $100M+ recovered. Our nearest office is at ${c.office}. Call 1-888-232-2898 for a free consultation."}},
          {"@type":"Question","name":"What are the most dangerous roads in ${c.name} CA?","acceptedAnswer":{"@type":"Answer","text":"The most dangerous roads in ${c.name} include ${c.streets}. These corridors see the highest rates of car accidents, truck collisions, and pedestrian crashes in the city."}},
          {"@type":"Question","name":"How long do I have to file a car accident claim in ${c.name} CA?","acceptedAnswer":{"@type":"Answer","text":"In California you have 2 years from the accident date to file a personal injury claim. Claims against government entities must be filed within 6 months. Call Gonzales Law Offices immediately at 1-888-232-2898 to preserve evidence."}},
          {"@type":"Question","name":"Which court handles car accident cases in ${c.name}?","acceptedAnswer":{"@type":"Answer","text":"Car accident civil cases from ${c.name} are heard at ${c.court}. Gonzales Law Offices litigates in this courthouse and knows the local judges and procedures."}}
        ]
      }
    ]
  }
  <\/script>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--red:#d42b2b;--gold:#c8a84b;--green:#37ff87;--bg:#060c1e;--surface:rgba(13,31,60,0.55);--border:rgba(255,255,255,0.08);--white:#fff;--muted:rgba(255,255,255,0.45)}
    html{scroll-behavior:smooth}
    body{background:var(--bg);color:var(--white);font-family:'Poppins',sans-serif;min-height:100vh;overflow-x:hidden}
    .top-nav{width:100%;background:rgba(6,12,30,0.95);border-bottom:1px solid var(--border);padding:12px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;backdrop-filter:blur(10px)}
    .nav-logo{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:var(--white);text-decoration:none}
    .nav-call{background:var(--red);color:#fff;font-size:12px;font-weight:700;padding:8px 16px;border-radius:100px;text-decoration:none}
    .hero{width:100%;max-width:680px;margin:0 auto;padding:48px 20px 32px}
    .hero-breadcrumb{font-size:11px;color:var(--muted);margin-bottom:16px}
    .hero-breadcrumb a{color:var(--muted);text-decoration:none}
    .hero-eyebrow{font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--red);margin-bottom:12px}
    .hero-h1{font-family:'Playfair Display',serif;font-size:clamp(26px,5vw,38px);font-weight:800;line-height:1.2;color:var(--white);margin-bottom:16px}
    .hero-h1 em{color:var(--red);font-style:normal}
    .hero-desc{font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:24px;max-width:560px}
    .hero-ctas{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px}
    .btn-primary{background:linear-gradient(135deg,var(--red),#9e1c1c);color:#fff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:100px;text-decoration:none;box-shadow:0 4px 20px rgba(212,43,43,0.4)}
    .btn-secondary{background:rgba(255,255,255,0.07);border:1px solid var(--border);color:var(--white);font-size:14px;font-weight:600;padding:14px 24px;border-radius:100px;text-decoration:none}
    .hero-stats{display:flex;flex-wrap:wrap;gap:20px}
    .stat-n{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--white)}
    .stat-l{font-size:11px;color:var(--muted)}
    .page-content{max-width:680px;margin:0 auto;padding:0 20px 60px;display:flex;flex-direction:column;gap:32px}
    .section-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:24px 22px}
    .card-eyebrow{font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:8px}
    .card-h2{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--white);margin-bottom:14px}
    .card-body{font-size:13px;color:var(--muted);line-height:1.75}
    .card-body strong{color:rgba(255,255,255,0.85);font-weight:700}
    .card-body a{color:var(--red);text-decoration:none}
    .data-table{width:100%;border-collapse:collapse;margin-top:14px}
    .data-table th{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--gold);padding:8px 10px;border-bottom:1px solid rgba(200,168,75,0.2);text-align:left}
    .data-table td{font-size:12px;color:var(--muted);padding:9px 10px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:top}
    .data-table td strong{color:rgba(255,255,255,0.8)}
    .data-table tr:last-child td{border-bottom:none}
    .tag-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}
    .tag{font-size:11px;font-weight:600;color:var(--muted);background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:100px;padding:4px 12px}
    .tag-highlight{font-size:10px;font-weight:700;color:var(--green);background:rgba(55,255,135,0.08);border:1px solid rgba(55,255,135,0.2);border-radius:100px;padding:3px 10px}
    .stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
    .stat-box{background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:12px;padding:14px 12px;text-align:center}
    .stat-box-n{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--white)}
    .stat-box-l{font-size:10px;color:var(--muted);margin-top:3px}
    .faq-list{display:flex;flex-direction:column;gap:12px;margin-top:4px}
    .faq-item{border-bottom:1px solid var(--border);padding-bottom:14px}
    .faq-item:last-child{border-bottom:none;padding-bottom:0}
    .faq-q{font-size:13px;font-weight:700;color:var(--white);margin-bottom:6px}
    .faq-a{font-size:12.5px;color:var(--muted);line-height:1.7}
    .cta-banner{background:linear-gradient(135deg,rgba(212,43,43,0.16),rgba(212,43,43,0.06));border:1px solid rgba(212,43,43,0.3);border-radius:20px;padding:28px 24px;text-align:center}
    .cta-banner h2{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--white);margin-bottom:10px}
    .cta-banner p{font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:20px}
    .map-embed{border-radius:14px;overflow:hidden;margin-top:14px}
    .map-embed iframe{display:block;filter:invert(0.88) hue-rotate(185deg) saturate(0.85)}
    footer{border-top:1px solid var(--border);padding:24px 20px;text-align:center;font-size:11px;color:var(--muted);max-width:680px;margin:0 auto}
    footer a{color:var(--muted);text-decoration:none}
  </style>
</head>
<body>

<nav class="top-nav">
  <a href="https://links.gonzaleslawoffices.com/" class="nav-logo">Gonzales Law Offices</a>
  <a href="tel:18882322898" class="nav-call">📞 Free Consultation</a>
</nav>

<div class="hero">
  <div class="hero-breadcrumb">
    <a href="https://links.gonzaleslawoffices.com/">Home</a> › Car Accident Lawyer ${c.name} CA
  </div>
  <div class="hero-eyebrow">${c.name}, CA · ${c.county} · CA Bar #249340</div>
  <h1 class="hero-h1">Car Accident Lawyer<br><em>${c.name}, California</em></h1>
  <p class="hero-desc">Injured in <strong>${c.name}</strong>? Gonzales Law Offices has recovered over <strong>$100 million</strong> for accident victims across Southern California. Attorney Mark Gonzales, Esq. (CA Bar #249340) offers free 24/7 consultations — <strong>no fee unless we win</strong>.</p>
  <div class="hero-ctas">
    <a href="tel:18882322898" class="btn-primary">📞 Call Free: 1-888-232-2898</a>
    <a href="https://links.gonzaleslawoffices.com/" class="btn-secondary">View All Services →</a>
  </div>
  <div class="hero-stats">
    <div class="stat"><span class="stat-n">$100M+</span><span class="stat-l">Recovered for Clients</span></div>
    <div class="stat"><span class="stat-n">4.9★</span><span class="stat-l">202+ Reviews</span></div>
    <div class="stat"><span class="stat-n">24/7</span><span class="stat-l">Free Consultations</span></div>
    <div class="stat"><span class="stat-n">2013</span><span class="stat-l">Serving ${c.name} Since</span></div>
  </div>
</div>

<div class="page-content">

  <div class="section-card">
    <div class="card-eyebrow">📊 ${c.name} Crash Statistics</div>
    <h2 class="card-h2">Car Accident Data — ${c.name}, CA</h2>
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-box-n">${c.crashes}</div><div class="stat-box-l">Annual crashes in ${c.name}</div></div>
      <div class="stat-box"><div class="stat-box-n">~16%</div><div class="stat-box-l">Involve injury or fatality</div></div>
      <div class="stat-box"><div class="stat-box-n">$0</div><div class="stat-box-l">Fee unless we win</div></div>
    </div>
  </div>

  <div class="section-card">
    <div class="card-eyebrow">🛣️ Most Dangerous Roads</div>
    <h2 class="card-h2">High-Risk Streets &amp; Freeways in ${c.name}</h2>
    <p class="card-body">If you were injured on any road in ${c.name}, you may have a strong personal injury claim. Gonzales Law Offices handles cases on every corridor below.</p>
    <div class="tag-row">
      ${streetList}
    </div>
  </div>

  <div class="section-card">
    <div class="card-eyebrow">🏥 Hospitals &amp; Trauma Centers</div>
    <h2 class="card-h2">Medical Facilities Serving ${c.name} Accident Victims</h2>
    <p class="card-body">We work with doctors and hospitals to document your injuries for your claim — and can connect you with lien-based specialists at <strong>zero out-of-pocket cost</strong>.</p>
    <table class="data-table">
      <thead><tr><th>Hospital</th><th>Note</th></tr></thead>
      <tbody>
        ${hospitalRows}
      </tbody>
    </table>
    <p class="card-body" style="margin-top:12px">No insurance? Call <a href="tel:18882322898">1-888-232-2898</a> — we refer you to doctors on a lien, pay nothing until settlement.</p>
  </div>

  <div class="section-card">
    <div class="card-eyebrow">🏛️ Local Court</div>
    <h2 class="card-h2">Court Handling ${c.name} Car Accident Cases</h2>
    <p class="card-body">Car accident civil cases from <strong>${c.name}</strong> are heard at:<br><br>
    <strong>${c.court}</strong><br><br>
    Gonzales Law Offices litigates in this courthouse and is trial-ready from day one.</p>
  </div>

  <div class="section-card">
    <div class="card-eyebrow">📍 Nearest Office to ${c.name}</div>
    <h2 class="card-h2">Gonzales Law Offices — ${c.officecity}</h2>
    <p class="card-body"><strong>${c.office}</strong><br>Open 24/7 · Walk-ins welcome · Se habla español · Free parking</p>
    <div class="map-embed">
      <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-PLACEHOLDER&q=${encodeURIComponent(c.office)}" width="100%" height="220" style="border:0;" allowfullscreen="" loading="lazy" title="Gonzales Law Offices — ${c.officecity}"></iframe>
    </div>
    <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
      <a href="https://www.google.com/maps/dir/?api=1&destination=${c.mapsq}" target="_blank" rel="noopener" class="btn-secondary" style="font-size:12px;padding:10px 18px;">🧭 Get Directions</a>
      <a href="tel:18882322898" class="btn-primary" style="font-size:12px;padding:10px 18px;">📞 Call Now</a>
    </div>
  </div>

  <div class="section-card">
    <div class="card-eyebrow">❓ FAQ — ${c.name} Car Accident Claims</div>
    <h2 class="card-h2">Common Questions from ${c.name} Accident Victims</h2>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q">Who is the best car accident lawyer in ${c.name}, CA?</div>
        <div class="faq-a">Gonzales Law Offices, led by Mark Gonzales, Esq. (CA Bar #249340), is rated the top car accident law firm serving ${c.name}. 4.9 stars · 202+ verified reviews · $100M+ recovered. Call 1-888-232-2898 for a free consultation — available 24/7.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">How long do I have to file a claim in ${c.name}?</div>
        <div class="faq-a">California's statute of limitations for personal injury is <strong>2 years</strong> from the accident date. For claims against government entities, you have only <strong>6 months</strong>. Don't wait — call immediately to preserve evidence.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Does Gonzales Law Offices serve ${c.name}?</div>
        <div class="faq-a">Yes. We serve all of ${c.county} and throughout Southern California. Our nearest office to ${c.name} is at ${c.office}. We also come to you — home, hospital, or virtual consultations available.</div>
      </div>
    </div>
  </div>

  <div class="cta-banner">
    <h2>Free Consultation — Available Right Now</h2>
    <p>Injured in ${c.name}? You deserve maximum compensation. Gonzales Law Offices has the experience, local knowledge, and results to win your case. Call now — 24 hours a day, 7 days a week. <strong>No fee unless we win.</strong></p>
    <a href="tel:18882322898" class="btn-primary" style="display:inline-block;">📞 Call 1-888-232-2898 — FREE</a>
  </div>

</div>

<footer>
  <p><a href="https://links.gonzaleslawoffices.com/">Gonzales Law Offices</a> · <a href="https://www.gonzaleslawoffices.com/">gonzaleslawoffices.com</a> · ${c.office} · <a href="tel:18882322898">1-888-232-2898</a></p>
  <p style="margin-top:8px">© 2026 Gonzales Law Offices P.C. · Mark Gonzales, Esq. CA Bar #249340</p>
</footer>

</body>
</html>`;
}

let created = 0;
for (const city of CITIES) {
  if (SKIP.includes(city.slug)) { console.log(`SKIP ${city.slug}`); continue; }
  const dir = path.join(__dirname, `${city.slug}-car-accident-lawyer`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const html = buildPage(city);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`OK   ${city.slug}-car-accident-lawyer/`);
  created++;
}
console.log(`\nDone — ${created} pages created.`);
