// src/components/AdvertisementFeatures/config.ts

export const getFeatureConfig = ({
  isOutSide = true,
  isUrgently = true,
  isWarranty = true,
})  => [
    {
        key: 'warrant',
        show: isWarranty,
        containerClass: 'warrent',
        textClass: 'warrent-text',
        text: 'Гарантия оплаты',
    },
    {
        key: 'urgent',
        show: isUrgently,
        containerClass: 'urgent',
        textClass: 'urgent-text',
        text: 'Срочный заказ',
    },
    {
      key: 'outside',
      show: isOutSide,
      containerClass: 'outside',
      textClass: 'outside-text',
      text: 'Вне биржи',
    },
].filter( (feature => feature.show) );