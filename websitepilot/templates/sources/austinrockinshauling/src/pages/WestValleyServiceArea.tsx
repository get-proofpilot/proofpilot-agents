import ServiceAreaPage, { City, GlanceRow, FaqItem } from './ServiceAreaPage';
import heroImage from '@/assets/west-valley-hero.jpg';
import quoteBgImage from '@/assets/west-valley-quote-bg.jpg';

const heroIntro = [
  "The West Valley is the fastest-growing region in metro Phoenix. New homes going up in Buckeye, Goodyear, and Surprise. Existing homes in Peoria, Glendale, and Sun City needing yards regraded, concrete removed, or lots cleared. Construction sites across Avondale, Litchfield Park, and Tolleson producing material needing hauling.",
  "Rocking S Hauling operates across every West Valley city. We bring dump trailers, skid steers, and the crew to handle your hauling, demolition, dirt work, and site prep. One company. One call. Every city west of I-17.",
];

const cities: City[] = [
  {
    name: 'Buckeye, AZ',
    paragraphs: [
      'Buckeye was the fastest-growing city in the nation between 2010 and 2020 and continues to grow at 5.3% year over year. Master-planned communities like Verrado and Teravalis are adding thousands of new homes. Major builders including D.R. Horton, Meritage Homes, Lennar, and David Weekley Homes are active across 136+ new home communities.',
      'New construction lots need clearing and grading. Finished homes need yard leveling, drainage correction, and concrete work. Buckeye soil is deep sandy desert soil with minimal caliche — grading goes faster here than in Mesa or Gilbert.',
    ],
    projects: 'New build site prep, lot clearing, yard leveling, concrete removal, construction debris hauling',
    zips: '85326, 85396',
    notable: 'Verrado, Teravalis, Tartesso, Festival Ranch, Sienna Hills, Sundance',
  },
  {
    name: 'Goodyear, AZ',
    paragraphs: [
      'Goodyear is growing at 5.0% per year. The new GSQ (Goodyear Civic Square) development is bringing retail, dining, and commercial activity to a 150-acre mixed-use district. New residential communities are launching along Yuma Road, Estrella Parkway, and the I-10 corridor. Goodyear High School opened for the 2025-2026 school year.',
      'Goodyear sits on sandy alluvial soil similar to Buckeye. Grading conditions are straightforward. Limited caliche in most neighborhoods.',
    ],
    projects: 'Lot grading, pool demo, yard leveling, concrete slab removal, new build site prep',
    zips: '85338, 85395',
    notable: 'Estrella, Palm Valley, Pebble Creek, Canyon Trails, GSQ, Montecito',
  },
  {
    name: 'Avondale, AZ',
    paragraphs: [
      "Avondale grew at 4.0% year over year. The city sits along I-10 between Phoenix and Goodyear with a mix of established neighborhoods and new construction. Avondale's location near Phoenix Raceway brings commercial and event-related construction activity.",
      'Older Avondale neighborhoods have aging concrete, overgrown lots, and drainage problems from decades of settling. New builds on the city\'s west side need the same clearing and grading as Goodyear and Buckeye.',
    ],
    projects: 'Concrete driveway removal, yard regrading, lot clearing, demolition of old structures, construction hauling',
    zips: '85323, 85392',
    notable: 'Coldwater Springs, Corte Sierra, Garden Lakes, Crystal Gardens',
  },
  {
    name: 'Litchfield Park, AZ',
    paragraphs: [
      'Litchfield Park is a small, established community surrounded by Goodyear. Known for The Wigwam resort and tree-lined streets. Most properties are on larger lots with mature trees needing yard regrading, tree and stump removal, old concrete tearout, and property cleanup.',
      'Litchfield Park lots tend to be larger than typical subdivision lots, which means more material to move and more hauling per project.',
    ],
    projects: 'Yard regrading, tree removal hauling, old patio demo, property cleanout',
    zips: '85340',
  },
  {
    name: 'Tolleson, AZ',
    paragraphs: [
      'Tolleson is a compact city between Phoenix and Avondale with a mix of residential and industrial properties. The industrial zone produces construction and demolition debris needing hauling. Residential areas include older homes needing concrete work, yard leveling, and property cleanup.',
    ],
    projects: 'Industrial debris hauling, concrete removal, yard grading, property cleanout',
    zips: '85353',
  },
  {
    name: 'Glendale, AZ',
    paragraphs: [
      'Glendale spans from the older, established neighborhoods near downtown to newer developments in the northwest. The city is home to State Farm Stadium, Desert Diamond Arena, and Westgate Entertainment District — commercial zones generating ongoing construction and renovation debris.',
      'North Glendale has newer master-planned communities. Central and south Glendale have older homes from the 1960s-1990s with aging driveways, patios, block walls, and yards settling over time. Sandy soil throughout most of Glendale makes grading work straightforward.',
    ],
    projects: 'Old concrete removal, driveway replacement prep, yard leveling, block wall demo, pool demolition, property cleanout',
    zips: '85301, 85302, 85303, 85304, 85305, 85306, 85307, 85308, 85310',
    notable: 'Arrowhead Ranch, Westgate, Thunderbird, Cactus, Deer Valley',
  },
  {
    name: 'Peoria, AZ',
    paragraphs: [
      'Peoria has 206,000 residents and continues growing at 1.5% year over year. The city stretches from the I-17/101 interchange northwest to Lake Pleasant. Northern Peoria is home to master-planned communities like Vistancia and Trilogy at Vistancia (55+ active adult).',
      'Peoria properties range from small subdivision lots in the south to acre-plus parcels in the north. Northern Peoria sits closer to the hills and has some rocky soil conditions. Southern Peoria soil is sandy and easy to grade.',
    ],
    projects: 'Lot clearing for new builds, yard regrading, pool demo, concrete removal, acreage clearing in north Peoria',
    zips: '85345, 85381, 85382, 85383',
    notable: 'Vistancia, Trilogy, Fletcher Heights, Sunrise Mountain, Lake Pleasant area',
  },
  {
    name: 'Surprise, AZ',
    paragraphs: [
      'Surprise grew from 30,000 residents in 2000 to over 167,000 today, with a 4.2% annual growth rate. Master-planned communities like Marley Park, Sterling Grove, Asante, Sun City Grand, and Greer Ranch house most of the population. Spring training baseball drives seasonal commercial activity.',
      'Existing homes in older communities like Sun City Grand and Arizona Traditions need yard regrading, concrete replacement, and property maintenance. Surprise soil is sandy loam with minimal caliche.',
    ],
    projects: 'New build site prep, yard leveling, concrete patio/driveway removal, pool demo, lot clearing',
    zips: '85374, 85378, 85379, 85387, 85388',
    notable: 'Marley Park, Sterling Grove, Sun City Grand, Surprise Farms, Asante, Greer Ranch',
  },
  {
    name: 'Sun City & Sun City West, AZ',
    paragraphs: [
      'Sun City and Sun City West are active adult communities (55+) built in the 1960s through 1990s. The median resident age is 65. Many homes are reaching the age where driveways crack, patios settle, yards develop drainage problems, and older structures like sheds and carports need demolition.',
      'Accessibility matters here. Our mini skid steers fit through the tight access points common in Sun City lot layouts so residents do not have to manage heavy equipment or debris removal themselves.',
    ],
    projects: 'Driveway and patio demolition, yard regrading, drainage correction, shed/carport demo, property cleanout',
    zips: '85351 (Sun City), 85373, 85375 (Sun City West)',
  },
  {
    name: 'El Mirage & Youngtown, AZ',
    paragraphs: [
      'El Mirage and Youngtown are small communities between Surprise and Glendale. Older housing stock and smaller lots. Properties here frequently need concrete removal, yard cleanup, and small demolition work. Budget-friendly pricing matters to homeowners in these areas.',
    ],
    projects: 'Concrete removal, yard cleanup, small demo, property cleanout, debris hauling',
    zips: '85335 (El Mirage), 85363 (Youngtown)',
  },
  {
    name: 'Laveen, AZ',
    paragraphs: [
      'Laveen is an unincorporated community in southwest Phoenix with a mix of older rural properties and newer master-planned developments like Rogers Ranch. The area has larger lots, horse properties, and agricultural parcels mixed with modern subdivisions. South Mountain borders Laveen to the east.',
      'Rural Laveen properties often need land clearing, fence line cleanup, horse property grading, and debris hauling. Laveen soil is sandy with easy grading conditions.',
    ],
    projects: 'Horse property grading, lot clearing, acreage cleanup, construction debris hauling, yard leveling',
    zips: '85339',
  },
  {
    name: 'West Phoenix (Maryvale, Estrella Village, West Encanto)',
    paragraphs: [
      'West Phoenix neighborhoods including Maryvale, Estrella Village, West Encanto, and the areas along I-10 and I-17 on the west side of downtown have older homes, commercial properties, and industrial zones. These areas produce steady demand for concrete removal, property cleanout, demolition of aging structures, and dirt work for renovation projects.',
    ],
    projects: 'Concrete slab removal, old block wall demo, yard regrading, property cleanout, construction debris hauling',
    zips: '85009, 85017, 85019, 85031, 85033, 85035, 85037, 85039, 85041, 85043',
  },
];

const glanceRows: GlanceRow[] = [
  { city: 'Buckeye', population: '115,000+', growth: '5.3%/yr', soil: 'Deep sandy, minimal caliche', topProjects: 'New build site prep, lot clearing' },
  { city: 'Goodyear', population: '105,000+', growth: '5.0%/yr', soil: 'Sandy alluvial', topProjects: 'Pool demo, lot grading, yard leveling' },
  { city: 'Avondale', population: '93,000+', growth: '4.0%/yr', soil: 'Sandy', topProjects: 'Concrete removal, lot clearing' },
  { city: 'Litchfield Park', population: '7,000', growth: 'Stable', soil: 'Sandy', topProjects: 'Yard regrading, patio demo' },
  { city: 'Tolleson', population: '7,800', growth: 'Stable', soil: 'Sandy', topProjects: 'Industrial hauling, concrete removal' },
  { city: 'Glendale', population: '255,000+', growth: '1.2%/yr', soil: 'Sandy', topProjects: 'Driveway demo, pool demo, yard leveling' },
  { city: 'Peoria', population: '206,000+', growth: '1.5%/yr', soil: 'Sandy south, rocky north', topProjects: 'Lot clearing, pool demo, acreage work' },
  { city: 'Surprise', population: '167,000+', growth: '4.2%/yr', soil: 'Sandy loam', topProjects: 'New build prep, concrete removal' },
  { city: 'Sun City / SCW', population: '65,000+', growth: 'Stable', soil: 'Sandy', topProjects: 'Driveway/patio demo, drainage fixes' },
  { city: 'El Mirage', population: '38,000+', growth: '2.1%/yr', soil: 'Sandy', topProjects: 'Concrete removal, yard cleanup' },
  { city: 'Laveen', population: '75,000+', growth: '3.5%/yr', soil: 'Sandy', topProjects: 'Horse property, lot clearing, acreage' },
  { city: 'West Phoenix', population: '300,000+', growth: '0.8%/yr', soil: 'Sandy', topProjects: 'Demo, concrete removal, hauling' },
];

const faqs: FaqItem[] = [
  {
    q: 'What West Valley cities do you serve?',
    a: 'We serve Buckeye, Goodyear, Avondale, Litchfield Park, Tolleson, Glendale, Peoria, Surprise, Sun City, Sun City West, El Mirage, Youngtown, Laveen, and all West Phoenix neighborhoods. If your property is west of I-17 in the Phoenix metro area, we cover it.',
  },
  {
    q: 'Is West Valley soil easier to work with than East Valley soil?',
    a: 'Yes. West Valley soil is primarily sandy and loose. East Valley soil frequently contains caliche, a rock-hard calcium carbonate layer requiring heavy equipment to break through. West Valley grading and excavation projects typically go faster and cost less because of the sandy soil conditions.',
  },
  {
    q: 'How much does hauling cost in the West Valley?',
    a: 'Dump trailer loads run $150 to $400 depending on material type and disposal location. Projects in Buckeye, Surprise, and the far West Valley often have slightly higher hauling costs due to distance from disposal facilities. We include hauling estimates in every project quote.',
  },
  {
    q: 'Do you work in new construction subdivisions?',
    a: 'Yes. We work with homeowners, builders, and general contractors in new construction communities across Buckeye, Goodyear, Surprise, and Peoria. We handle lot clearing, site prep, grading, trenching, and construction debris hauling.',
  },
  {
    q: 'Do you serve Sun City residents?',
    a: 'Yes. We work with Sun City and Sun City West homeowners on driveway removal, patio demolition, yard regrading, drainage correction, and property cleanout. Our mini skid steers fit through the tight lot access common in Sun City neighborhoods.',
  },
  {
    q: 'How fast do you respond to West Valley requests?',
    a: 'We respond to every estimate request within 24 hours. Most West Valley projects start within the same week. Our crew operates across the entire West Valley daily.',
  },
];

const cityLinks = [
  { name: 'Buckeye' },
  { name: 'Goodyear' },
  { name: 'Avondale' },
  { name: 'Litchfield Park' },
  { name: 'Tolleson' },
  { name: 'Glendale' },
  { name: 'Peoria' },
  { name: 'Surprise' },
  { name: 'Sun City' },
  { name: 'El Mirage' },
  { name: 'Laveen' },
  { name: 'West Phoenix' },
].map((c) => ({ ...c, href: '#' }));

const WestValleyServiceArea = () => (
  <ServiceAreaPage
    region="West Valley"
    siblingRegion="East Valley"
    siblingHref="/service-areas/east-valley-phoenix-az"
    canonical="https://rockingshauling.com/service-areas/west-valley-phoenix-az"
    metaTitle="Hauling, Demolition & Dirt Work | West Valley Phoenix AZ"
    metaDescription="Rocking S Hauling serves the entire West Valley. Dump trailer rental, demolition, dirt work, and skid steer services. Free estimates."
    heroImage={heroImage}
    heroIntro={heroIntro}
    cities={cities}
    glanceRows={glanceRows}
    faqs={faqs}
    cityLinks={cityLinks}
    quoteBgImage={quoteBgImage}
  />
);

export default WestValleyServiceArea;
