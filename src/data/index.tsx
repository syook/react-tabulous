import { Button, IconButton, Select } from '../reactTabulous/components/widgets';

const DATA_SET_COUNT = 1000;

const minAge = 20;
const maxAge = 80;

const minMobile = 6600_000_000;
const maxMobile = 9999_999_999;

const levelMapping = {
  1: { text: 'Beginner', color: 'green' },
  2: { text: 'Intermediate', color: 'orange' },
  3: { text: 'Advanced', color: 'red' }
};

const adjectives: string[] = [
  'awesome',
  'bold',
  'creative',
  'daring',
  'energetic',
  'fearless',
  'gracious',
  'humble',
  'inspiring',
  'joyful',
  'kind',
  'loving',
  'motivated',
  'nurturing',
  'optimistic',
  'passionate',
  'quirky',
  'resourceful',
  'sincere',
  'thoughtful',
  'unique',
  'vibrant',
  'witty',
  'xenial',
  'yielding',
  'zesty'
];
const nouns: string[] = [
  'artist',
  'baker',
  'coder',
  'dancer',
  'engineer',
  'farmer',
  'gardener',
  'hiker',
  'inventor',
  'juggler',
  'knitter',
  'learner',
  'musician',
  'novelist',
  'observer',
  'pilot',
  'quizzer',
  'runner',
  'singer',
  'teacher',
  'unicyclist',
  'volunteer',
  'writer',
  'xylophonist',
  'yogi',
  'zoologist'
];

function generateBio(): string {
  const adjective: string = adjectives[Math.floor(Math.random() * adjectives.length)]; // Pick a random adjective
  const noun: string = nouns[Math.floor(Math.random() * nouns.length)]; // Pick a random noun
  const age: number = Math.floor(Math.random() * 50) + 18; // Generate a random age between 18 and 67
  const bio: string = `I'm an ${adjective} ${noun} who loves to explore new things. I'm ${age} years old and passionate about making the world a better place.`;
  return bio;
}

function getRandomJournalTitle(): string {
  const adjectives: string[] = [
    'International',
    'National',
    'Regional',
    'Local',
    'Scientific',
    'Technical',
    'Academic',
    'Special',
    'Popular',
    'Controversial'
  ];
  const nouns: string[] = [
    'Journal',
    'Gazette',
    'Bulletin',
    'Chronicle',
    'Observer',
    'Recorder',
    'Reporter',
    'News',
    'Review',
    'Digest'
  ];
  const randomAdjective: string = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun: string = nouns[Math.floor(Math.random() * nouns.length)];
  const randomIndex: number = Math.floor(Math.random() * 100) + 1;
  const randomTitle: string = `${randomAdjective} ${randomNoun} ${randomIndex}`;
  return randomTitle;
}

function getRandomBirthDate(): Date {
  const minYear: number = 1900;
  const minMonth: number = 0;
  const currentYear: number = new Date().getFullYear();
  const currentMonth: number = new Date().getMonth();
  const minDate: Date = new Date(minYear, minMonth, 1);
  const currentDate: Date = new Date(currentYear, currentMonth, 1);
  const diffTime: number = Math.abs(currentDate.getTime() - minDate.getTime());
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const randomDays: number = Math.floor(Math.random() * diffDays);
  const randomDate: Date = new Date(minDate);
  randomDate.setDate(minDate.getDate() + randomDays);
  return randomDate;
}

function getRandomDateTime(): Date {
  const minYear: number = 1900;
  const minMonth: number = 0;
  const currentYear: number = new Date().getFullYear();
  const currentMonth: number = new Date().getMonth();
  const minDate: Date = new Date(minYear, minMonth, 1);
  const currentDate: Date = new Date(currentYear, currentMonth, 1);
  const diffTime: number = Math.abs(currentDate.getTime() - minDate.getTime());
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const randomDays: number = Math.floor(Math.random() * diffDays);
  const randomMilliseconds: number = Math.floor(Math.random() * (24 * 60 * 60 * 1000));
  const randomDate: Date = new Date(minDate);
  randomDate.setDate(minDate.getDate() + randomDays);
  randomDate.setMilliseconds(randomMilliseconds);
  return randomDate;
}

function getRandomDateTimeBelowCurrentTime(): Date {
  const currentDate: Date = new Date();
  const currentYear: number = currentDate.getFullYear();
  const currentMonth: number = currentDate.getMonth();
  const currentDay: number = currentDate.getDate();
  const currentHours: number = currentDate.getHours();
  // const currentMinutes: number = currentDate.getMinutes();
  // const currentSeconds: number = currentDate.getSeconds();
  // const currentMilliseconds: number = currentDate.getMilliseconds();
  const randomHours: number = Math.floor(Math.random() * currentHours);
  const randomMinutes: number = Math.floor(Math.random() * 60);
  const randomSeconds: number = Math.floor(Math.random() * 60);
  const randomMilliseconds: number = Math.floor(Math.random() * 1000);
  const randomDate: Date = new Date(
    currentYear,
    currentMonth,
    currentDay,
    randomHours,
    randomMinutes,
    randomSeconds,
    randomMilliseconds
  );
  return randomDate;
}

function generateUniqueId(): number {
  const random: number = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const id: string = random.toString().padStart(4, '0'); // Convert the random number to a string and ensure that it has exactly 4 digits
  return +id;
}

function generateAddress(): { country: string; state: string; city: string; pinCode: string } {
  const addresses = {
    India: {
      Karnataka: {
        Bengaluru: ['560001', '560002', '560003', '560004', '560005'],
        Mysuru: ['570001', '570002', '570003', '570004', '570005'],
        Mangaluru: ['575001', '575002', '575003', '575004', '575005']
      },
      Maharashtra: {
        Mumbai: ['400001', '400002', '400003', '400004', '400005'],
        Pune: ['411001', '411002', '411003', '411004', '411005'],
        Nagpur: ['440001', '440002', '440003', '440004', '440005']
      },
      Delhi: {
        Delhi: ['110001', '110002', '110003', '110004', '110005'],
        'New Delhi': ['110001', '110002', '110003', '110004', '110005'],
        'North Delhi': ['110001', '110002', '110003', '110004', '110005']
      },
      'Tamil Nadu': {
        Chennai: ['600001', '600002', '600003', '600004', '600005'],
        Coimbatore: ['641001', '641002', '641003', '641004', '641005'],
        Madurai: ['625001', '625002', '625003', '625004', '625005']
      },
      Telangana: {
        Hyderabad: ['500001', '500002', '500003', '500004', '500005'],
        Warangal: ['506001', '506002', '506003', '506004', '506005'],
        Karimnagar: ['505001', '505002', '505003', '505004', '505005']
      }
    },
    'United States': {
      Alabama: {
        Birmingham: ['35005', '35006', '35007', '35008', '35009'],
        Montgomery: ['36001', '36002', '36003', '36004', '36005'],
        Mobile: ['36601', '36602', '36603', '36604', '36605']
      },
      Alaska: {
        Anchorage: ['99501', '99502', '99503', '99504', '99505'],
        Fairbanks: ['99701', '99702', '99703', '99704', '99705'],
        Juneau: ['99801', '99802', '99803', '99804', '99805']
      },
      Arizona: {
        Phoenix: ['85001', '85002', '85003', '85004', '85005'],
        Tucson: ['85701', '85702', '85703', '85704', '85705'],
        Mesa: ['85201', '85202', '85203', '85204', '85205']
      },
      Arkansas: {
        'Little Rock': ['72201', '72202', '72203', '72204', '72205'],
        'Fort Smith': ['72901', '72902', '72903', '72904', '72905'],
        Fayetteville: ['72701', '72702', '72703', '72704', '72705']
      },
      California: {
        'Los Angeles': ['90001', '90002', '90003', '90004', '90005'],
        'San Diego': ['92101', '92102', '92103', '92104', '92105'],
        'San Jose': ['95101', '95102', '95103', '95104', '95105']
      }
    },
    Australia: {
      'New South Wales': {
        Sydney: ['1001', '1002', '1003', '1004', '1005'],
        Albury: ['2640', '2641', '2642', '2643', '2644'],
        Bathurst: ['2795', '2796', '2797', '2798', '2799']
      },
      Queensland: {
        Brisbane: ['4000', '4001', '4002', '4003', '4004'],
        Bundaberg: ['4670', '4671', '4672', '4673', '4674'],
        Cairns: ['4870', '4871', '4872', '4873', '4874']
      },
      'South Australia': {
        Adelaide: ['5000', '5001', '5002', '5003', '5004'],
        'Mount Gambier': ['5290', '5291', '5292', '5293', '5294'],
        Whyalla: ['5600', '5601', '5602', '5603', '5604']
      },
      'Western Australia': {
        Perth: ['6000', '6001', '6002', '6003', '6004'],
        Albany: ['6330', '6331', '6332', '6333', '6334'],
        Bunbury: ['6230', '6231', '6232', '6233', '6234']
      },
      Victoria: {
        Melbourne: ['3000', '3001', '3002', '3003', '3004'],
        Ararat: ['3377', '3378', '3379', '3380', '3381'],
        Benalla: ['3671', '3672', '3673', '3674', '3675']
      }
    }
  };
  const country = Object.keys(addresses)[Math.floor(Math.random() * Object.keys(addresses).length)];
  const stateObj = addresses[country as keyof typeof addresses];
  const state = Object.keys(stateObj)[Math.floor(Math.random() * Object.keys(stateObj).length)];
  const cityObj = stateObj[state as keyof typeof stateObj];
  const city = Object.keys(cityObj)[Math.floor(Math.random() * Object.keys(cityObj).length)];
  const pinCode = cityObj[city as keyof typeof cityObj][Math.floor(Math.random() * 4)];

  return { country, state, city, pinCode };
}

export const dataSet1 = Array.from({ length: DATA_SET_COUNT }, (_, i) => ({
  name: `test${i + 1}`,
  email: `test${i + 1}@test.com`
}));

export const getDataSetBasedOnCountPassed = (count: number = 20) => {
  const dataSet = Array.from({ length: count }, (_, i) => ({
    name: `test${i + 1}`,
    email: `test${i + 1}@test.com`
  }));
  return dataSet;
};

export const dataSet1Columns = [
  {
    field: 'name',
    headerName: 'Name',
    sortable: false,
    isVisible: true
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    isVisible: true
  }
];

const workPlaceOptions = ['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'];

export const dataSet21 = [];
export const dataSet2 = Array.from({ length: DATA_SET_COUNT }, (_, i) => {
  const id = generateUniqueId();

  return {
    id,
    name: `test${i + 1}`,
    email: `test${i + 1}@test.com`,
    age: Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge,
    mobile: Math.floor(Math.random() * (maxMobile - minMobile + 1)) + minMobile,
    isLoggedIn: (id % 2 === 0).toString(),
    bio: generateBio(),
    birthDate: getRandomBirthDate(),
    lastJournalPublish: getRandomDateTime(),
    lastLogin: getRandomDateTimeBelowCurrentTime(),
    journalTitle: getRandomJournalTitle(),
    level: i > 5 ? Math.ceil(Math.random() * 3) : '',
    workPlace: workPlaceOptions[Math.floor(Math.random() * workPlaceOptions.length)],
    address: generateAddress()
  };
});

export const dataSet2Columns1 = [];
export const dataSet2Columns = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'profile',
    headerName: 'Profile',
    type: 'string',
    renderCell: (row: any) => {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
            borderRadius: '50%',
            color: 'white',
            backgroundColor: 'orange',
            fontWeight: 'bold'
          }}
        >
          {row.name.charAt(0).toUpperCase()}
        </div>
      );
    }
  },
  {
    field: 'name',
    headerName: 'Name',
    type: 'string',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'level',
    headerName: 'Level',
    type: 'singleSelect',
    valueGetter: (row: any) => row?.level,
    renderCell: (row: any) => {
      const level: 1 | 2 | 3 = row?.level;

      const { text: levelText, color: levelColor } = level ? levelMapping[level] : { text: '', color: '' };

      return <span style={{ color: levelColor }}>{levelText}</span>;
    },
    options: [
      { label: 'Select', value: '' },
      { label: 'Beginner', value: 1 },
      { label: 'Intermediate', value: 2 },
      { label: 'Advanced', value: 3 }
    ],
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'birthDate',
    headerName: 'Birth Date',
    type: 'date',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'email',
    headerName: 'Email Address',
    type: 'string',
    isFilterable: true,
    // isSortable: true,
    isSearchable: true
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    type: 'number',
    isFilterable: true,
    // isSortable: true,
    isSearchable: true
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'isLoggedIn',
    headerName: 'Logged In',
    type: 'boolean',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'workPlace',
    headerName: 'Work Place',
    type: 'string',
    renderCell: (row: any) => {
      const workPlace = row?.workPlace ?? '';

      const onChange = (event: any) => {
        console.log(event.target.value);
      };

      return <Select value={workPlace} options={workPlaceOptions} onChange={onChange} />;
    }
  },
  {
    field: 'address',
    valueGetter: (row: any) =>
      `${row.address?.city ?? ''}, ${row.address?.state ?? ''}, ${row.address?.country ?? ''}  - ${
        row.address?.pinCode ?? ''
      }`,
    headerName: 'Address',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'lastJournalPublish',
    headerName: 'Last Journal Publish Date',
    type: 'dateTime',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  // {
  // 	field: 'bio',
  // 	headerName: 'Bio',
  // 	type: 'string'
  // },
  {
    field: 'journalTitle',
    headerName: 'Journal Title',
    type: 'string',
    isFilterable: true,
    isSortable: true,
    isSearchable: true
  },
  {
    field: 'action',
    headerName: 'Action',
    type: 'action',
    renderCell: (row: any) => {
      const onClick = () => {
        alert(JSON.stringify(row, null, 2));
        console.log(row);
      };

      return (
        <div style={{ display: 'flex' }}>
          <IconButton name="add" onClick={onClick} type="transparent" size={16} />
          <IconButton name="close" onClick={onClick} type="transparent" size={16} />
          <Button size="small" variant="contained" onClick={onClick}>
            Click
          </Button>
        </div>
      );
    }
  }
];
