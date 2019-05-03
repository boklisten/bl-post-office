export const SMS_SETTINGS = {
  minLength: 5,
  maxLength: 120,
  fromNumber: '+4759447665',
  dymmy: {
    number: '+4712345678',
  },
  text: {
    reminder: {
      'partly-payment': [
        'Hei fra oss i Boklisten.no. Snart er det klart for andre delbetaling av dine bøker',
        'Hei fra oss i Boklisten.no. Fristen er snart her for andre delbetaling av dine bøker.',
      ],
      rent: [
        'Hei fra oss i Boklisten.no. Du har bøker som snart skal leveres inn',
      ],
      loan: [
        'Hei fra oss i Boklisten.no. Snart er det tid for å levere bøkene du lånte',
      ],
    },
  },
};
