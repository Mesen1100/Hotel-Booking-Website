import {create} from 'zustand';

type CountryType = {
    abbr: string
    name: string,
    suggested?: boolean,
  };

type NationalityState = {
  nationalities: CountryType[];
  selectedNationality: CountryType |null;
  setSelectedNationality: (newNationality: CountryType) => void;
};

const useNationalityStore = create<NationalityState>((set) => ({
    nationalities: [
    { name: 'Afghanistan', abbr: 'AF'},
    { icon: 'ğŸ‡¦ğŸ‡½', name: 'Alland Islands', abbr: 'AX', code: '358' },
    { icon: 'ğŸ‡¦ğŸ‡±', name: 'Albania', abbr: 'AL', code: '355' },
    { icon: 'ğŸ‡©ğŸ‡¿', name: 'Algeria', abbr: 'DZ', code: '213' },
    { icon: 'ğŸ‡¦ğŸ‡¸', name: 'American Samoa', abbr: 'AS', code: '1-684' },
    { icon: 'ğŸ‡¦ğŸ‡©', name: 'Andorra', abbr: 'AD', code: '376' },
    { icon: 'ğŸ‡¦ğŸ‡´', name: 'Angola', abbr: 'AO', code: '244' },
    { icon: 'ğŸ‡¦ğŸ‡®', name: 'Anguilla', abbr: 'AI', code: '1-264' },
    { icon: 'ğŸ‡¦ğŸ‡¶', name: 'Antarctica', abbr: 'AQ', code: '672' },
    { icon: 'ğŸ‡¦ğŸ‡¬', name: 'Antigua and Barbuda', abbr: 'AG', code: '1-268' },
    { icon: 'ğŸ‡¦ğŸ‡·', name: 'Argentina', abbr: 'AR', code: '54' },
    { icon: 'ğŸ‡¦ğŸ‡²', name: 'Armenia', abbr: 'AM', code: '374' },
    { icon: 'ğŸ‡¦ğŸ‡¼', name: 'Aruba', abbr: 'AW', code: '297' },
    { icon: 'ğŸ‡¦ğŸ‡º', name: 'Australia', abbr: 'AU', code: '61', suggested: true },
    { icon: 'ğŸ‡¦ğŸ‡¹', name: 'Austria', abbr: 'AT', code: '43' },
    { icon: 'ğŸ‡¦ğŸ‡¿', name: 'Azerbaijan', abbr: 'AZ', code: '994' },
    { icon: 'ğŸ‡§ğŸ‡¸', name: 'Bahamas', abbr: 'BS', code: '1-242' },
    { icon: 'ğŸ‡§ğŸ‡­', name: 'Bahrain', abbr: 'BH', code: '973' },
    { icon: 'ğŸ‡§ğŸ‡©', name: 'Bangladesh', abbr: 'BD', code: '880' },
    { icon: 'ğŸ‡§ğŸ‡§', name: 'Barbados', abbr: 'BB', code: '1-246' },
    { icon: 'ğŸ‡§ğŸ‡¾', name: 'Belarus', abbr: 'BY', code: '375' },
    { icon: 'ğŸ‡§ğŸ‡ª', name: 'Belgium', abbr: 'BE', code: '32' },
    { icon: 'ğŸ‡§ğŸ‡¿', name: 'Belize', abbr: 'BZ', code: '501' },
    { icon: 'ğŸ‡§ğŸ‡¯', name: 'Benin', abbr: 'BJ', code: '229' },
    { icon: 'ğŸ‡§ğŸ‡²', name: 'Bermuda', abbr: 'BM', code: '1-441' },
    { icon: 'ğŸ‡§ğŸ‡¹', name: 'Bhutan', abbr: 'BT', code: '975' },
    { icon: 'ğŸ‡§ğŸ‡´', name: 'Bolivia', abbr: 'BO', code: '591' },
    { icon: 'ğŸ‡§ğŸ‡¦', name: 'Bosnia and Herzegovina', abbr: 'BA', code: '387' },
    { icon: 'ğŸ‡§ğŸ‡¼', name: 'Botswana', abbr: 'BW', code: '267' },
    { icon: 'ğŸ‡§ğŸ‡»', name: 'Bouvet Island', abbr: 'BV', code: '47' },
    { icon: 'ğŸ‡§ğŸ‡·', name: 'Brazil', abbr: 'BR', code: '55' },
    {
      icon: 'ğŸ‡®ğŸ‡´',
      name: 'British Indian Ocean Territory',
      abbr: 'IO',
      code: '246',
    },
    { icon: 'ğŸ‡»ğŸ‡¬', name: 'British Virgin Islands', abbr: 'VG', code: '1-284' },
    { icon: 'ğŸ‡§ğŸ‡³', name: 'Brunei Darussalam', abbr: 'BN', code: '673' },
    { icon: 'ğŸ‡§ğŸ‡¬', name: 'Bulgaria', abbr: 'BG', code: '359' },
    { icon: 'ğŸ‡§ğŸ‡«', name: 'Burkina Faso', abbr: 'BF', code: '226' },
    { icon: 'ğŸ‡§ğŸ‡®', name: 'Burundi', abbr: 'BI', code: '257' },
    { icon: 'ğŸ‡°ğŸ‡­', name: 'Cambodia', abbr: 'KH', code: '855' },
    { icon: 'ğŸ‡¨ğŸ‡²', name: 'Cameroon', abbr: 'CM', code: '237' },
    { icon: 'ğŸ‡¨ğŸ‡¦', name: 'Canada', abbr: 'CA', code: '1', suggested: true },
    { icon: 'ğŸ‡¨ğŸ‡»', name: 'Cape Verde', abbr: 'CV', code: '238' },
    { icon: 'ğŸ‡°ğŸ‡¾', name: 'Cayman Islands', abbr: 'KY', code: '1-345' },
    { icon: 'ğŸ‡¨ğŸ‡«', name: 'Central African Republic', abbr: 'CF', code: '236' },
    { icon: 'ğŸ‡¹ğŸ‡©', name: 'Chad', abbr: 'TD', code: '235' },
    { icon: 'ğŸ‡¨ğŸ‡±', name: 'Chile', abbr: 'CL', code: '56' },
    { icon: 'ğŸ‡¨ğŸ‡³', name: 'China', abbr: 'CN', code: '86' },
    { icon: 'ğŸ‡¨ğŸ‡½', name: 'Christmas Island', abbr: 'CX', code: '61' },
    { icon: 'ğŸ‡¨ğŸ‡¨', name: 'Cocos (Keeling) Islands', abbr: 'CC', code: '61' },
    { icon: 'ğŸ‡¨ğŸ‡´', name: 'Colombia', abbr: 'CO', code: '57' },
    { icon: 'ğŸ‡°ğŸ‡²', name: 'Comoros', abbr: 'KM', code: '269' },
    {
      icon: 'ğŸ‡¨ğŸ‡©',
      name: 'Congo, Democratic Republic of the',
      abbr: 'CG',
      code: '243',
    },
    {
      icon: 'ğŸ‡¨ğŸ‡¬',
      name: 'Congo, Republic of the',
      abbr: 'CD',
      code: '242',
    },
    { icon: 'ğŸ‡¨ğŸ‡°', name: 'Cook Islands', abbr: 'CK', code: '682' },
    { icon: 'ğŸ‡¨ğŸ‡·', name: 'Costa Rica', abbr: 'CR', code: '506' },
    { icon: 'ğŸ‡¨ğŸ‡®', name: "Cote d'Ivoire", abbr: 'CI', code: '225' },
    { icon: 'ğŸ‡­ğŸ‡·', name: 'Croatia', abbr: 'HR', code: '385' },
    { icon: 'ğŸ‡¨ğŸ‡º', name: 'Cuba', abbr: 'CU', code: '53' },
    { icon: 'ğŸ‡¨ğŸ‡¼', name: 'Curacao', abbr: 'CW', code: '599' },
    { icon: 'ğŸ‡¨ğŸ‡¾', name: 'Cyprus', abbr: 'CY', code: '357' },
    { icon: 'ğŸ‡¨ğŸ‡¿', name: 'Czech Republic', abbr: 'CZ', code: '420' },
    { icon: 'ğŸ‡©ğŸ‡°', name: 'Denmark', abbr: 'DK', code: '45' },
    { icon: 'ğŸ‡©ğŸ‡¯', name: 'Djibouti', abbr: 'DJ', code: '253' },
    { icon: 'ğŸ‡©ğŸ‡²', name: 'Dominica', abbr: 'DM', code: '1-767' },
    { icon: 'ğŸ‡©ğŸ‡´', name: 'Dominican Republic', abbr: 'DO', code: '1-809' },
    { icon: 'ğŸ‡ªğŸ‡¨', name: 'Ecuador', abbr: 'EC', code: '593' },
    { icon: 'ğŸ‡ªğŸ‡¬', name: 'Egypt', abbr: 'EG', code: '20' },
    { icon: 'ğŸ‡¸ğŸ‡»', name: 'El Salvador', abbr: 'SV', code: '503' },
    { icon: 'ğŸ‡¬ğŸ‡¶', name: 'Equatorial Guinea', abbr: 'GQ', code: '240' },
    { icon: 'ğŸ‡ªğŸ‡·', name: 'Eritrea', abbr: 'ER', code: '291' },
    { icon: 'ğŸ‡ªğŸ‡ª', name: 'Estonia', abbr: 'EE', code: '372' },
    { icon: 'ğŸ‡ªğŸ‡¹', name: 'Ethiopia', abbr: 'ET', code: '251' },
    { icon: 'ğŸ‡«ğŸ‡°', name: 'Falkland Islands (Malvinas)', abbr: 'FK', code: '500' },
    { icon: 'ğŸ‡«ğŸ‡´', name: 'Faroe Islands', abbr: 'FO', code: '298' },
    { icon: 'ğŸ‡«ğŸ‡¯', name: 'Fiji', abbr: 'FJ', code: '679' },
    { icon: 'ğŸ‡«ğŸ‡®', name: 'Finland', abbr: 'FI', code: '358' },
    { icon: 'ğŸ‡«ğŸ‡·', name: 'France', abbr: 'FR', code: '33', suggested: true },
    { icon: 'ğŸ‡¬ğŸ‡«', name: 'French Guiana', abbr: 'GF', code: '594' },
    { icon: 'ğŸ‡µğŸ‡«', name: 'French Polynesia', abbr: 'PF', code: '689' },
    { icon: 'ğŸ‡¹ğŸ‡«', name: 'French Southern Territories', abbr: 'TF', code: '262' },
    { icon: 'ğŸ‡¬ğŸ‡¦', name: 'Gabon', abbr: 'GA', code: '241' },
    { icon: 'ğŸ‡¬ğŸ‡²', name: 'Gambia', abbr: 'GM', code: '220' },
    { icon: 'ğŸ‡¬ğŸ‡ª', name: 'Georgia', abbr: 'GE', code: '995' },
    { icon: 'ğŸ‡©ğŸ‡ª', name: 'Germany', abbr: 'DE', code: '49', suggested: true },
    { icon: 'ğŸ‡¬ğŸ‡­', name: 'Ghana', abbr: 'GH', code: '233' },
    { icon: 'ğŸ‡¬ğŸ‡®', name: 'Gibraltar', abbr: 'GI', code: '350' },
    { icon: 'ğŸ‡¬ğŸ‡·', name: 'Greece', abbr: 'GR', code: '30' },
    { icon: 'ğŸ‡¬ğŸ‡±', name: 'Greenland', abbr: 'GL', code: '299' },
    { icon: 'ğŸ‡¬ğŸ‡©', name: 'Grenada', abbr: 'GD', code: '1-473' },
    { icon: 'ğŸ‡¬ğŸ‡µ', name: 'Guadeloupe', abbr: 'GP', code: '590' },
    { icon: 'ğŸ‡¬ğŸ‡º', name: 'Guam', abbr: 'GU', code: '1-671' },
    { icon: 'ğŸ‡¬ğŸ‡¹', name: 'Guatemala', abbr: 'GT', code: '502' },
    { icon: 'ğŸ‡¬ğŸ‡¬', name: 'Guernsey', abbr: 'GG', code: '44' },
    { icon: 'ğŸ‡¬ğŸ‡¼', name: 'Guinea-Bissau', abbr: 'GW', code: '245' },
    { icon: 'ğŸ‡¬ğŸ‡³', name: 'Guinea', abbr: 'GN', code: '224' },
    { icon: 'ğŸ‡¬ğŸ‡¾', name: 'Guyana', abbr: 'GY', code: '592' },
    { icon: 'ğŸ‡­ğŸ‡¹', name: 'Haiti', abbr: 'HT', code: '509' },
    {
      icon: 'ğŸ‡­ğŸ‡²',
      name: 'Heard Island and McDonald Islands',
      abbr: 'HM',
      code: '672',
    },
    {
      icon: 'ğŸ‡»ğŸ‡¦',
      name: 'Holy See (Vatican City State)',
      abbr: 'VA',
      code: '379',
    },
    { icon: 'ğŸ‡­ğŸ‡³', name: 'Honduras', abbr: 'HN', code: '504' },
    { icon: 'ğŸ‡­ğŸ‡°', name: 'Hong Kong', abbr: 'HK', code: '852' },
    { icon: 'ğŸ‡­ğŸ‡º', name: 'Hungary', abbr: 'HU', code: '36' },
    { icon: 'ğŸ‡®ğŸ‡¸', name: 'Iceland', abbr: 'IS', code: '354' },
    { icon: 'ğŸ‡®ğŸ‡³', name: 'India', abbr: 'IN', code: '91' },
    { icon: 'ğŸ‡®ğŸ‡©', name: 'Indonesia', abbr: 'ID', code: '62' },
    { icon: 'ğŸ‡®ğŸ‡·', name: 'Iran, Islamic Republic of', abbr: 'IR', code: '98' },
    { icon: 'ğŸ‡®ğŸ‡¶', name: 'Iraq', abbr: 'IQ', code: '964' },
    { icon: 'ğŸ‡®ğŸ‡ª', name: 'Ireland', abbr: 'IE', code: '353' },
    { icon: 'ğŸ‡®ğŸ‡²', name: 'Isle of Man', abbr: 'IM', code: '44' },
    { icon: 'ğŸ‡®ğŸ‡±', name: 'Israel', abbr: 'IL', code: '972' },
    { icon: 'ğŸ‡®ğŸ‡¹', name: 'Italy', abbr: 'IT', code: '39' },
    { icon: 'ğŸ‡¯ğŸ‡²', name: 'Jamaica', abbr: 'JM', code: '1-876' },
    { icon: 'ğŸ‡¯ğŸ‡µ', name: 'Japan', abbr: 'JP', code: '81', suggested: true },
    { icon: 'ğŸ‡¯ğŸ‡ª', name: 'Jersey', abbr: 'JE', code: '44' },
    { icon: 'ğŸ‡¯ğŸ‡´', name: 'Jordan', abbr: 'JO', code: '962' },
    { icon: 'ğŸ‡°ğŸ‡¿', name: 'Kazakhstan', abbr: 'KZ', code: '7' },
    { icon: 'ğŸ‡°ğŸ‡ª', name: 'Kenya', abbr: 'KE', code: '254' },
    { icon: 'ğŸ‡°ğŸ‡®', name: 'Kiribati', abbr: 'KI', code: '686' },
    {
      icon: 'ğŸ‡°ğŸ‡µ',
      name: "Korea, Democratic People's Republic of",
      abbr: 'KP',
      code: '850',
    },
    { icon: 'ğŸ‡°ğŸ‡·', name: 'Korea, Republic of', abbr: 'KR', code: '82' },
    { icon: 'ğŸ‡½ğŸ‡°', name: 'Kosovo', abbr: 'XK', code: '383' },
    { icon: 'ğŸ‡°ğŸ‡¼', name: 'Kuwait', abbr: 'KW', code: '965' },
    { icon: 'ğŸ‡°ğŸ‡¬', name: 'Kyrgyzstan', abbr: 'KG', code: '996' },
    {
      icon: 'ğŸ‡±ğŸ‡¦',
      name: "Lao People's Democratic Republic",
      abbr: 'LA',
      code: '856',
    },
    { icon: 'ğŸ‡±ğŸ‡»', name: 'Latvia', abbr: 'LV', code: '371' },
    { icon: 'ğŸ‡±ğŸ‡§', name: 'Lebanon', abbr: 'LB', code: '961' },
    { icon: 'ğŸ‡±ğŸ‡¸', name: 'Lesotho', abbr: 'LS', code: '266' },
    { icon: 'ğŸ‡±ğŸ‡·', name: 'Liberia', abbr: 'LR', code: '231' },
    { icon: 'ğŸ‡±ğŸ‡¾', name: 'Libya', abbr: 'LY', code: '218' },
    { icon: 'ğŸ‡±ğŸ‡®', name: 'Liechtenstein', abbr: 'LI', code: '423' },
    { icon: 'ğŸ‡±ğŸ‡¹', name: 'Lithuania', abbr: 'LT', code: '370' },
    { icon: 'ğŸ‡±ğŸ‡º', name: 'Luxembourg', abbr: 'LU', code: '352' },
    { icon: 'ğŸ‡²ğŸ‡´', name: 'Macao', abbr: 'MO', code: '853' },
    {
      icon: 'ğŸ‡²ğŸ‡°',
      name: 'Macedonia, the Former Yugoslav Republic of',
      abbr: 'MK',
      code: '389',
    },
    { icon: 'ğŸ‡²ğŸ‡¬', name: 'Madagascar', abbr: 'MG', code: '261' },
    { icon: 'ğŸ‡²ğŸ‡¼', name: 'Malawi', abbr: 'MW', code: '265' },
    { icon: 'ğŸ‡²ğŸ‡¾', name: 'Malaysia', abbr: 'MY', code: '60' },
    { icon: 'ğŸ‡²ğŸ‡»', name: 'Maldives', abbr: 'MV', code: '960' },
    { icon: 'ğŸ‡²ğŸ‡±', name: 'Mali', abbr: 'ML', code: '223' },
    { icon: 'ğŸ‡²ğŸ‡¹', name: 'Malta', abbr: 'MT', code: '356' },
    { icon: 'ğŸ‡²ğŸ‡­', name: 'Marshall Islands', abbr: 'MH', code: '692' },
    { icon: 'ğŸ‡²ğŸ‡¶', name: 'Martinique', abbr: 'MQ', code: '596' },
    { icon: 'ğŸ‡²ğŸ‡·', name: 'Mauritania', abbr: 'MR', code: '222' },
    { icon: 'ğŸ‡²ğŸ‡º', name: 'Mauritius', abbr: 'MU', code: '230' },
    { icon: 'ğŸ‡¾ğŸ‡¹', name: 'Mayotte', abbr: 'YT', code: '262' },
    { icon: 'ğŸ‡²ğŸ‡½', name: 'Mexico', abbr: 'MX', code: '52' },
    {
      icon: 'ğŸ‡«ğŸ‡²',
      name: 'Micronesia, Federated States of',
      abbr: 'FM',
      code: '691',
    },
    { icon: 'ğŸ‡²ğŸ‡©', name: 'Moldova, Republic of', abbr: 'MD', code: '373' },
    { icon: 'ğŸ‡²ğŸ‡¨', name: 'Monaco', abbr: 'MC', code: '377' },
    { icon: 'ğŸ‡²ğŸ‡³', name: 'Mongolia', abbr: 'MN', code: '976' },
    { icon: 'ğŸ‡²ğŸ‡ª', name: 'Montenegro', abbr: 'ME', code: '382' },
    { icon: 'ğŸ‡²ğŸ‡¸', name: 'Montserrat', abbr: 'MS', code: '1-664' },
    { icon: 'ğŸ‡²ğŸ‡¦', name: 'Morocco', abbr: 'MA', code: '212' },
    { icon: 'ğŸ‡²ğŸ‡¿', name: 'Mozambique', abbr: 'MZ', code: '258' },
    { icon: 'ğŸ‡²ğŸ‡²', name: 'Myanmar', abbr: 'MM', code: '95' },
    { icon: 'ğŸ‡³ğŸ‡¦', name: 'Namibia', abbr: 'NA', code: '264' },
    { icon: 'ğŸ‡³ğŸ‡·', name: 'Nauru', abbr: 'NR', code: '674' },
    { icon: 'ğŸ‡³ğŸ‡µ', name: 'Nepal', abbr: 'NP', code: '977' },
    { icon: 'ğŸ‡³ğŸ‡±', name: 'Netherlands', abbr: 'NL', code: '31' },
    { icon: 'ğŸ‡³ğŸ‡¨', name: 'New Caledonia', abbr: 'NC', code: '687' },
    { icon: 'ğŸ‡³ğŸ‡¿', name: 'New Zealand', abbr: 'NZ', code: '64' },
    { icon: 'ğŸ‡³ğŸ‡®', name: 'Nicaragua', abbr: 'NI', code: '505' },
    { icon: 'ğŸ‡³ğŸ‡ª', name: 'Niger', abbr: 'NE', code: '227' },
    { icon: 'ğŸ‡³ğŸ‡¬', name: 'Nigeria', abbr: 'NG', code: '234' },
    { icon: 'ğŸ‡³ğŸ‡º', name: 'Niue', abbr: 'NU', code: '683' },
    { icon: 'ğŸ‡³ğŸ‡«', name: 'Norfolk Island', abbr: 'NF', code: '672' },
    { icon: 'ğŸ‡²ğŸ‡µ', name: 'Northern Mariana Islands', abbr: 'MP', code: '1-670' },
    { icon: 'ğŸ‡³ğŸ‡´', name: 'Norway', abbr: 'NO', code: '47' },
    { icon: 'ğŸ‡´ğŸ‡²', name: 'Oman', abbr: 'OM', code: '968' },
    { icon: 'ğŸ‡µğŸ‡°', name: 'Pakistan', abbr: 'PK', code: '92' },
    { icon: 'ğŸ‡µğŸ‡¼', name: 'Palau', abbr: 'PW', code: '680' },
    { icon: 'ğŸ‡µğŸ‡¸', name: 'Palestine, State of', abbr: 'PS', code: '970' },
    { icon: 'ğŸ‡µğŸ‡¦', name: 'Panama', abbr: 'PA', code: '507' },
    { icon: 'ğŸ‡µğŸ‡¬', name: 'Papua New Guinea', abbr: 'PG', code: '675' },
    { icon: 'ğŸ‡µğŸ‡¾', name: 'Paraguay', abbr: 'PY', code: '595' },
    { icon: 'ğŸ‡µğŸ‡ª', name: 'Peru', abbr: 'PE', code: '51' },
    { icon: 'ğŸ‡µğŸ‡­', name: 'Philippines', abbr: 'PH', code: '63' },
    { icon: 'ğŸ‡µğŸ‡³', name: 'Pitcairn', abbr: 'PN', code: '870' },
    { icon: 'ğŸ‡µğŸ‡±', name: 'Poland', abbr: 'PL', code: '48' },
    { icon: 'ğŸ‡µğŸ‡¹', name: 'Portugal', abbr: 'PT', code: '351' },
    { icon: 'ğŸ‡µğŸ‡·', name: 'Puerto Rico', abbr: 'PR', code: '1' },
    { icon: 'ğŸ‡¶ğŸ‡¦', name: 'Qatar', abbr: 'QA', code: '974' },
    { icon: 'ğŸ‡·ğŸ‡ª', name: 'Reunion', abbr: 'RE', code: '262' },
    { icon: 'ğŸ‡·ğŸ‡´', name: 'Romania', abbr: 'RO', code: '40' },
    { icon: 'ğŸ‡·ğŸ‡º', name: 'Russian Federation', abbr: 'RU', code: '7' },
    { icon: 'ğŸ‡·ğŸ‡¼', name: 'Rwanda', abbr: 'RW', code: '250' },
    { icon: 'ğŸ‡§ğŸ‡±', name: 'Saint Barthelemy', abbr: 'BL', code: '590' },
    { icon: 'ğŸ‡¸ğŸ‡­', name: 'Saint Helena', abbr: 'SH', code: '290' },
    { icon: 'ğŸ‡°ğŸ‡³', name: 'Saint Kitts and Nevis', abbr: 'KN', code: '1-869' },
    { icon: 'ğŸ‡±ğŸ‡¨', name: 'Saint Lucia', abbr: 'LC', code: '1-758' },
    { icon: 'ğŸ‡²ğŸ‡«', name: 'Saint Martin (French part)', abbr: 'MF', code: '590' },
    { icon: 'ğŸ‡µğŸ‡²', name: 'Saint Pierre and Miquelon', abbr: 'PM', code: '508' },
    {
      icon: 'ğŸ‡»ğŸ‡¨',
      name: 'Saint Vincent and the Grenadines',
      abbr: 'VC',
      code: '1-784',
    },
    { icon: 'ğŸ‡¼ğŸ‡¸', name: 'Samoa', abbr: 'WS', code: '685' },
    { icon: 'ğŸ‡¸ğŸ‡²', name: 'San Marino', abbr: 'SM', code: '378' },
    { icon: 'ğŸ‡¸ğŸ‡¹', name: 'Sao Tome and Principe', abbr: 'ST', code: '239' },
    { icon: 'ğŸ‡¸ğŸ‡¦', name: 'Saudi Arabia', abbr: 'SA', code: '966' },
    { icon: 'ğŸ‡¸ğŸ‡³', name: 'Senegal', abbr: 'SN', code: '221' },
    { icon: 'ğŸ‡·ğŸ‡¸', name: 'Serbia', abbr: 'RS', code: '381' },
    { icon: 'ğŸ‡¸ğŸ‡¨', name: 'Seychelles', abbr: 'SC', code: '248' },
    { icon: 'ğŸ‡¸ğŸ‡±', name: 'Sierra Leone', abbr: 'SL', code: '232' },
    { icon: 'ğŸ‡¸ğŸ‡¬', name: 'Singapore', abbr: 'SG', code: '65' },
    { icon: 'ğŸ‡¸ğŸ‡½', name: 'Sint Maarten (Dutch part)', abbr: 'SX', code: '1-721' },
    { icon: 'ğŸ‡¸ğŸ‡°', name: 'Slovakia', abbr: 'SK', code: '421' },
    { icon: 'ğŸ‡¸ğŸ‡®', name: 'Slovenia', abbr: 'SI', code: '386' },
    { icon: 'ğŸ‡¸ğŸ‡§', name: 'Solomon Islands', abbr: 'SB', code: '677' },
    { icon: 'ğŸ‡¸ğŸ‡´', name: 'Somalia', abbr: 'SO', code: '252' },
    { icon: 'ğŸ‡¿ğŸ‡¦', name: 'South Africa', abbr: 'ZA', code: '27' },
    {
      icon: 'ğŸ‡¬ğŸ‡¸',
      name: 'South Georgia and the South Sandwich Islands',
      abbr: 'GS',
      code: '500',
    },
    { icon: 'ğŸ‡¸ğŸ‡¸', name: 'South Sudan', abbr: 'SS', code: '211' },
    { icon: 'ğŸ‡ªğŸ‡¸', name: 'Spain', abbr: 'ES', code: '34' },
    { icon: 'ğŸ‡±ğŸ‡°', name: 'Sri Lanka', abbr: 'LK', code: '94' },
    { icon: 'ğŸ‡¸ğŸ‡©', name: 'Sudan', abbr: 'SD', code: '249' },
    { icon: 'ğŸ‡¸ğŸ‡·', name: 'Suriname', abbr: 'SR', code: '597' },
    { icon: 'ğŸ‡¸ğŸ‡¯', name: 'Svalbard and Jan Mayen', abbr: 'SJ', code: '47' },
    { icon: 'ğŸ‡¸ğŸ‡¿', name: 'Swaziland', abbr: 'SZ', code: '268' },
    { icon: 'ğŸ‡¸ğŸ‡ª', name: 'Sweden', abbr: 'SE', code: '46' },
    { icon: 'ğŸ‡¨ğŸ‡­', name: 'Switzerland', abbr: 'CH', code: '41' },
    { icon: 'ğŸ‡¸ğŸ‡¾', name: 'Syrian Arab Republic', abbr: 'SY', code: '963' },
    { icon: 'ğŸ‡¹ğŸ‡¼', name: 'Taiwan, Province of China', abbr: 'TW', code: '886' },
    { icon: 'ğŸ‡¹ğŸ‡¯', name: 'Tajikistan', abbr: 'TJ', code: '992' },
    { icon: 'ğŸ‡¹ğŸ‡­', name: 'Thailand', abbr: 'TH', code: '66' },
    { icon: 'ğŸ‡¹ğŸ‡±', name: 'Timor-Leste', abbr: 'TL', code: '670' },
    { icon: 'ğŸ‡¹ğŸ‡¬', name: 'Togo', abbr: 'TG', code: '228' },
    { icon: 'ğŸ‡¹ğŸ‡°', name: 'Tokelau', abbr: 'TK', code: '690' },
    { icon: 'ğŸ‡¹ğŸ‡´', name: 'Tonga', abbr: 'TO', code: '676' },
    { icon: 'ğŸ‡¹ğŸ‡¹', name: 'Trinidad and Tobago', abbr: 'TT', code: '1-868' },
    { icon: 'ğŸ‡¹ğŸ‡³', name: 'Tunisia', abbr: 'TN', code: '216' },
    { icon: 'ğŸ‡¹ğŸ‡·', name: 'Türkiye', abbr: 'TR', code: '90' },
    { icon: 'ğŸ‡¹ğŸ‡²', name: 'Turkmenistan', abbr: 'TM', code: '993' },
    { icon: 'ğŸ‡¹ğŸ‡¨', name: 'Turks and Caicos Islands', abbr: 'TC', code: '1-649' },
    { icon: 'ğŸ‡¹ğŸ‡»', name: 'Tuvalu', abbr: 'TV', code: '688' },
    { icon: 'ğŸ‡ºğŸ‡¬', name: 'Uganda', abbr: 'UG', code: '256' },
    { icon: 'ğŸ‡ºğŸ‡¦', name: 'Ukraine', abbr: 'UA', code: '380' },
    { icon: 'ğŸ‡¦ğŸ‡ª', name: 'United Arab Emirates', abbr: 'AE', code: '971' },
    { icon: 'ğŸ‡¬ğŸ‡§', name: 'United Kingdom', abbr: 'GB', code: '44' },
    { icon: 'ğŸ‡¹ğŸ‡¿', name: 'United Republic of Tanzania', abbr: 'TZ', code: '255' },
    { icon: 'ğŸ‡ºğŸ‡²', name: 'United States', abbr: 'US', code: '1', suggested: true },
    { icon: 'ğŸ‡ºğŸ‡¾', name: 'Uruguay', abbr: 'UY', code: '598' },
    { icon: 'ğŸ‡»ğŸ‡®', name: 'US Virgin Islands', abbr: 'VI', code: '1-340' },
    { icon: 'ğŸ‡ºğŸ‡¿', name: 'Uzbekistan', abbr: 'UZ', code: '998' },
    { icon: 'ğŸ‡»ğŸ‡º', name: 'Vanuatu', abbr: 'VU', code: '678' },
    { icon: 'ğŸ‡»ğŸ‡ª', name: 'Venezuela', abbr: 'VE', code: '58' },
    { icon: 'ğŸ‡»ğŸ‡³', name: 'Vietnam', abbr: 'VN', code: '84' },
    { icon: 'ğŸ‡¼ğŸ‡«', name: 'Wallis and Futuna', abbr: 'WF', code: '681' },
    { icon: 'ğŸ‡ªğŸ‡­', name: 'Western Sahara', abbr: 'EH', code: '212' },
    { icon: 'ğŸ‡¾ğŸ‡ª', name: 'Yemen', abbr: 'YE', code: '967' },
    { icon: 'ğŸ‡¿ğŸ‡²', name: 'Zambia', abbr: 'ZM', code: '260' },
    { icon: 'ğŸ‡¿ğŸ‡¼', name: 'Zimbabwe', abbr: 'ZW', code: '263' },
  ],
  selectedNationality: {
      abbr: "TR", name: "Türkiye",
  },
  setSelectedNationality: (newNationality: CountryType) => set({ selectedNationality: newNationality }),
}));

export default useNationalityStore;
