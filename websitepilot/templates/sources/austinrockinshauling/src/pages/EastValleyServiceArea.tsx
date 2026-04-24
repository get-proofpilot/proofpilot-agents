import ServiceAreaPage, { City, GlanceRow, FaqItem } from './ServiceAreaPage';
import heroImage from '@/assets/east-valley-hero.jpg';
import quoteBgImage from '@/assets/east-valley-quote-bg.jpg';

const heroIntro = [
  'The East Valley is home to 1.4 million people across Mesa, Gilbert, Chandler, Tempe, Scottsdale, Queen Creek, Apache Junction, and the fast-growing Pinal County corridor. Established neighborhoods need renovation support. New communities in Queen Creek, San Tan Valley, and Florence are building out at a rapid pace. Custom home builds in Scottsdale, Paradise Valley, and Fountain Hills require specialized site work on challenging terrain.',
  'Rocking S Hauling operates across every East Valley city. We bring the dump trailers, skid steers, and crew to handle your project from start to cleanup. East Valley soil is tougher than the West Valley — caliche rock sits under most properties in Mesa, Gilbert, and Apache Junction. Our equipment and operators handle it.',
];

const cities: City[] = [
  {
    name: 'Mesa, AZ',
    paragraphs: [
      'Mesa is the third-largest city in Arizona with over 530,000 residents. The city spans 133 square miles from Tempe on the west to Apache Junction on the east, with everything from older 1950s neighborhoods near downtown to brand-new construction in the far east and southeast.',
      'Mesa sits on some of the heaviest caliche deposits in the Valley. Projects in east Mesa regularly hit caliche 6 to 12 inches below the surface. Our equipment handles it with ripper teeth and hydraulic breakers. Budget extra time and cost for Mesa caliche when planning your project.',
    ],
    projects: 'Pool excavation through caliche, lot grading, concrete removal, new build site prep, yard leveling',
    zips: '85201, 85202, 85203, 85204, 85205, 85206, 85207, 85208, 85209, 85210, 85212, 85213, 85215',
    notable: 'Superstition Springs, Red Mountain, Las Sendas, Eastmark, Alta Mesa, Mesa Riverview',
  },
  {
    name: 'Gilbert, AZ',
    paragraphs: [
      'Gilbert has 294,689 residents and is the fourth-largest community in Arizona. Once a farming town, Gilbert has transformed into a modern suburban city with master-planned communities, top-rated schools, and a vibrant Heritage District downtown. Growth has slowed to 0.9% per year because the town is approaching build-out.',
      'Near build-out does not mean less work. It means more renovation projects, pool demolitions, tear-down/rebuilds, and yard overhauls on aging properties. Gilbert soil has caliche layers and clay pockets complicating every dig.',
    ],
    projects: 'Pool demo, driveway replacement, backyard leveling, old patio tearout, ADU site prep',
    zips: '85233, 85234, 85295, 85296, 85297, 85298',
    notable: 'Agritopia, Morrison Ranch, Val Vista Lakes, Higley, Power Ranch',
  },
  {
    name: 'Chandler, AZ',
    paragraphs: [
      'Chandler has 288,299 residents and a strong commercial base anchored by Intel, PayPal, Northrop Grumman, and other tech employers. The south Chandler corridor along Gilbert Road and Arizona Avenue is home to newer developments. West Chandler and downtown Chandler have established homes from the 1980s-2000s.',
      'Moderate caliche in most Chandler neighborhoods. Sandy soil in the south near the Gila River Indian Community. Chandler homeowners frequently need pool demolition, yard regrading for drainage issues, and concrete replacement.',
    ],
    projects: 'Pool demo, yard regrading, driveway removal, lot grading, construction debris hauling',
    zips: '85224, 85225, 85226, 85248, 85249, 85286',
    notable: 'Ocotillo, Sun Groves, Chandler Heights, downtown Chandler, south Chandler tech corridor',
  },
  {
    name: 'Tempe, AZ',
    paragraphs: [
      'Tempe has 196,000 residents and is home to Arizona State University. The city is nearly fully built out, which means projects focus on renovation, teardown/rebuild, and infill construction. Tempe properties tend to be on smaller lots with tight access, making mini skid steers the right equipment choice for most residential work.',
      "Mixed sand and clay soil with shallow caliche in some areas. Tempe's proximity to ASU drives rental property renovations, concrete work, and yard overhauls.",
    ],
    projects: 'Concrete removal, backyard leveling, small demo, property cleanout, ADU site prep',
    zips: '85281, 85282, 85283, 85284',
    notable: 'South Tempe, Kiwanis Park, Tempe Town Lake area, Rural/Baseline corridor, ASU area',
  },
  {
    name: 'Scottsdale, AZ',
    paragraphs: [
      'Scottsdale stretches from Tempe on the south to Carefree and Rio Verde on the north. South Scottsdale has established neighborhoods. Central Scottsdale includes McCormick Ranch, Gainey Ranch, and Kierland. North Scottsdale features custom estate lots, luxury homes, and hillside properties with challenging terrain.',
      'North Scottsdale soil is rocky, caliche-heavy, and often on slope. Custom home site prep here requires experienced operators and heavy equipment. Scottsdale projects frequently involve pool excavation, estate lot grading, hillside stabilization, and luxury property site prep.',
    ],
    projects: 'Custom home site prep, pool excavation, estate grading, hillside work, old home demo',
    zips: '85250, 85251, 85253, 85254, 85255, 85256, 85257, 85258, 85259, 85260, 85262, 85266',
    notable: 'Old Town, McCormick Ranch, Gainey Ranch, DC Ranch, North Scottsdale, Grayhawk, Troon',
  },
  {
    name: 'Paradise Valley, AZ',
    paragraphs: [
      'Paradise Valley is an exclusive community with one-acre minimum lot sizes and strict zoning. Luxury custom homes range from $1M to $20M+. Building or renovating here requires top-tier site work — estate lots need clearing, grading, and utility trenching. Tear-down/rebuilds require full demolition and site prep on properties with existing structures, mature trees, and complex terrain.',
      'Custom builds in Paradise Valley average $400 to $700 per square foot and take 12 to 24 months from permit to move-in. The dirt work phase is the first step. We handle it.',
    ],
    projects: 'Estate lot clearing and grading, tear-down demo, pool excavation, utility trenching, material hauling',
    zips: '85253',
  },
  {
    name: 'Fountain Hills, AZ',
    paragraphs: [
      "Fountain Hills is a planned community northeast of Scottsdale known for the world's fourth-tallest fountain. The town has about 24,000 residents. Properties range from standard subdivision homes to hillside custom builds with desert terrain and rocky soil.",
      'Hillside lots in Fountain Hills require careful grading and stabilization. Rocky desert soil with caliche and granite is common. Access roads on hillside properties often need grading for construction equipment.',
    ],
    projects: 'Hillside grading, custom home site prep, access road grading, pool excavation, property clearing',
    zips: '85268',
  },
  {
    name: 'Queen Creek, AZ',
    paragraphs: [
      'Queen Creek is the second-fastest-growing community in Arizona. The town has transformed from a rural farming community into one of Arizona\'s most desirable residential destinations with over 80,000 residents. Major builders including Lennar, Meritage, Taylor Morrison, KB Home, and Ashton Woods are active across 200+ new home communities.',
      'Every new home needs lot clearing, grading, foundation excavation, utility trenching, and construction debris hauling. Existing homes in older Queen Creek neighborhoods need yard work, drainage correction, and concrete replacement. San Tan Mountain Regional Park borders the town to the east.',
    ],
    projects: 'New build site prep, lot clearing, grading, construction hauling, yard leveling, horse property work',
    zips: '85140, 85142',
    notable: 'Sossaman Estates, Encanterra, Queen Creek Station, Hastings Farms',
  },
  {
    name: 'San Tan Valley, AZ',
    paragraphs: [
      'San Tan Valley is an unincorporated community in Pinal County growing rapidly alongside Queen Creek. Home prices average $408,000. New subdivisions are going up along Ironwood Drive, Hunt Highway, and Bella Vista Road. The area has a mix of new construction and rural properties with larger lots.',
      'San Tan Valley soil is mixed, with caliche in some areas and sandy soil in others. Rural properties in the outer areas need land clearing, fence line work, and acreage grading.',
    ],
    projects: 'New build site prep, lot clearing, rural property grading, horse property work, debris hauling',
    zips: '85140, 85143',
  },
  {
    name: 'Apache Junction & Gold Canyon, AZ',
    paragraphs: [
      'Apache Junction sits at the base of the Superstition Mountains with about 42,000 residents. The city has a mix of manufactured homes, single-family residences, and rural properties with acreage. Gold Canyon, a census-designated community east of Apache Junction, features retirement communities and custom homes near the mountains.',
      'Apache Junction and Gold Canyon have some of the heaviest caliche and rockiest soil in the entire Valley. Every excavation project here requires equipment built for breaking rock. Larger lots and horse properties are common.',
    ],
    projects: 'Caliche-heavy excavation, lot clearing, horse property grading, driveway grading, mobile home demo, debris hauling',
    zips: '85119, 85120 (Apache Junction), 85118 (Gold Canyon)',
    notable: 'Superstition Mountain, Gold Canyon, Dolce Vita (55+), Lost Dutchman area',
  },
  {
    name: 'Ahwatukee Foothills, AZ',
    paragraphs: [
      'Ahwatukee is a master-planned community in south Phoenix, bordered by South Mountain and I-10. About 80,000 residents live in this neighborhood functioning as its own city within Phoenix. The area is nearly built out, meaning most projects involve renovation, pool demo, yard overhauls, and concrete replacement on homes built in the 1980s-2000s.',
    ],
    projects: 'Pool demo, driveway replacement, yard regrading, concrete removal, property cleanout',
    zips: '85044, 85045, 85048',
  },
  {
    name: 'Maricopa, AZ',
    paragraphs: [
      'The city of Maricopa is in Pinal County, about 20 miles south of Chandler. The city exploded from 1,000 residents in 2000 to over 65,000 today. Master-planned communities like Province (55+), Rancho El Dorado, and Tortosa house the bulk of the population. New builds continue along the SR 347 corridor.',
      'Maricopa soil is deep sandy desert with minimal rock. Grading is fast. The distance from Phoenix means slightly higher hauling costs, but the sandy soil offsets the distance with faster job completion.',
    ],
    projects: 'New build site prep, lot clearing, yard leveling, concrete removal, pool demo',
    zips: '85138, 85139',
    notable: 'Province, Rancho El Dorado, Tortosa, The Villages at Rancho El Dorado, Cobblestone Farms',
  },
  {
    name: 'Casa Grande, Coolidge & Florence, AZ',
    paragraphs: [
      'These Pinal County cities sit along the I-10 and US-60 corridors at the southern edge of the Rocking S Hauling territory. Casa Grande (population 60,000+) is the commercial hub, home to the Lucid Motors manufacturing plant (900,000 SF, expanding to 3M+ SF). Coolidge and Florence have smaller populations but are growing with affordable new construction.',
      'These cities sit far enough from Phoenix where most Valley-based hauling and dirt work companies do not serve them. Rocking S covers this area, giving homeowners and builders south of the Valley an option without calling a Tucson contractor.',
    ],
    projects: 'New build site prep, lot clearing, industrial debris hauling, concrete removal, property cleanout',
    zips: '85122 (Coolidge), 85132 (Florence), 85193, 85194 (Casa Grande)',
    notable: 'Lucid Motors, new home communities, SR 347/I-10 corridor development',
  },
  {
    name: 'Rio Verde & Fort McDowell, AZ',
    paragraphs: [
      'Rio Verde is an unincorporated community northeast of Fountain Hills with custom homes, horse properties, and acreage lots on desert terrain. Fort McDowell Yavapai Nation borders to the north. Properties here have rocky desert soil, steep grades, and rural access conditions.',
    ],
    projects: 'Custom home site prep, acreage clearing, road grading, horse property work',
    zips: '85263 (Rio Verde), 85264 (Fort McDowell)',
  },
];

const glanceRows: GlanceRow[] = [
  { city: 'Mesa', population: '530,000+', growth: '1.0%/yr', soil: 'Heavy caliche throughout', topProjects: 'Pool excavation, site prep, demo' },
  { city: 'Gilbert', population: '294,000+', growth: '0.9%/yr', soil: 'Caliche + clay pockets', topProjects: 'Pool demo, renovation, ADU prep' },
  { city: 'Chandler', population: '288,000+', growth: '0.7%/yr', soil: 'Moderate caliche, sandy south', topProjects: 'Pool demo, yard regrading' },
  { city: 'Tempe', population: '196,000+', growth: '1.4%/yr', soil: 'Mixed sand/clay, shallow caliche', topProjects: 'Concrete removal, small demo' },
  { city: 'Scottsdale', population: '260,000+', growth: '0.8%/yr', soil: 'Rocky north, caliche south', topProjects: 'Custom site prep, estate grading' },
  { city: 'Paradise Valley', population: '14,000', growth: 'Stable', soil: 'Rocky, caliche, hillside', topProjects: 'Estate lot prep, tear-down demo' },
  { city: 'Fountain Hills', population: '24,000', growth: '0.5%/yr', soil: 'Rocky desert, granite', topProjects: 'Hillside grading, pool excavation' },
  { city: 'Queen Creek', population: '80,000+', growth: '6.2%/yr', soil: 'Mixed, some caliche', topProjects: 'New build prep, lot clearing' },
  { city: 'San Tan Valley', population: '100,000+', growth: '4.5%/yr', soil: 'Mixed sandy/caliche', topProjects: 'New build prep, rural clearing' },
  { city: 'Apache Junction', population: '42,000+', growth: '1.5%/yr', soil: 'Heavy rock and caliche', topProjects: 'Rock excavation, lot clearing' },
  { city: 'Ahwatukee', population: '80,000+', growth: 'Stable', soil: 'Mixed', topProjects: 'Pool demo, yard regrading' },
  { city: 'Maricopa', population: '65,000+', growth: '3.0%/yr', soil: 'Deep sandy, minimal rock', topProjects: 'New build prep, lot clearing' },
  { city: 'Casa Grande', population: '60,000+', growth: '2.5%/yr', soil: 'Sandy', topProjects: 'Industrial hauling, site prep' },
  { city: 'Rio Verde', population: '3,000+', growth: 'Stable', soil: 'Rocky desert', topProjects: 'Custom site prep, acreage clearing' },
];

const faqs: FaqItem[] = [
  {
    q: 'What East Valley cities do you serve?',
    a: 'We serve Mesa, Gilbert, Chandler, Tempe, Scottsdale, Paradise Valley, Fountain Hills, Queen Creek, San Tan Valley, Apache Junction, Gold Canyon, Ahwatukee, Maricopa, Casa Grande, Coolidge, Florence, Rio Verde, and Fort McDowell. If your property is east of I-17 in the Phoenix metro, we cover it.',
  },
  {
    q: 'Why does East Valley dirt work cost more than West Valley?',
    a: 'Caliche. The East Valley sits on calcium carbonate rock layers ranging from soft and crumbly to harder than concrete. Breaking through caliche requires hydraulic breakers and ripper teeth, adding time and cost to every excavation and grading project. West Valley soil is primarily sandy and grades faster.',
  },
  {
    q: 'Do you serve Queen Creek, San Tan Valley, and the Pinal County corridor?',
    a: 'Yes. We serve every community along the US-60 and I-10 corridors including Queen Creek, San Tan Valley, Florence, Coolidge, Casa Grande, and Maricopa. Many Valley-based companies do not travel this far south. We do.',
  },
  {
    q: 'Do you handle luxury and custom home site work in Scottsdale and Paradise Valley?',
    a: 'Yes. We handle estate lot clearing, hillside grading, tear-down demolition, pool excavation, and utility trenching for custom home builds in Scottsdale, Paradise Valley, and Fountain Hills. Our operators have experience with the rocky terrain and complex grades these properties require.',
  },
  {
    q: 'How does caliche affect my project timeline and cost?',
    a: 'Caliche adds time to every dig. A lot grading job that takes one day on sandy West Valley soil often takes two days in Mesa or Gilbert because of caliche layers. Excavation costs increase $2 to $10 per cubic yard depending on caliche hardness. We assess soil conditions during the site visit and account for caliche in every East Valley estimate.',
  },
  {
    q: 'Do you work in Apache Junction and Gold Canyon?',
    a: 'Yes. Apache Junction and Gold Canyon have some of the rockiest soil in the Valley. We bring equipment built for breaking rock and caliche. We also serve horse properties, acreage lots, and rural properties with unpaved access roads in this area.',
  },
];

const cityLinks = [
  { name: 'Mesa' },
  { name: 'Gilbert' },
  { name: 'Chandler' },
  { name: 'Tempe' },
  { name: 'Scottsdale' },
  { name: 'Paradise Valley' },
  { name: 'Fountain Hills' },
  { name: 'Queen Creek' },
  { name: 'San Tan Valley' },
  { name: 'Apache Junction' },
  { name: 'Ahwatukee' },
  { name: 'Maricopa' },
  { name: 'Casa Grande' },
  { name: 'Rio Verde' },
].map((c) => ({ ...c, href: '#' }));

const EastValleyServiceArea = () => (
  <ServiceAreaPage
    region="East Valley"
    siblingRegion="West Valley"
    siblingHref="/service-areas/west-valley-phoenix-az"
    canonical="https://rockingshauling.com/service-areas/east-valley-phoenix-az"
    metaTitle="Hauling, Demolition & Dirt Work | East Valley Phoenix AZ"
    metaDescription="Rocking S Hauling serves the entire East Valley. Hauling, demolition, dirt work, skid steer in Mesa, Gilbert, Chandler, and more. Free estimates."
    heroImage={heroImage}
    heroIntro={heroIntro}
    cities={cities}
    glanceRows={glanceRows}
    faqs={faqs}
    cityLinks={cityLinks}
    quoteBgImage={quoteBgImage}
  />
);

export default EastValleyServiceArea;
