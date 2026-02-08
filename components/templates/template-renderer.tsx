'use client';

import { 
  GiftBoxTemplate,
  MagicCardTemplate,
  HeartBoxTemplate,
  ScrollTemplate,
  BalloonTemplate,
  EnvelopeTemplate,
  BirthdayCakeTemplate,
  TreasureChestTemplate,
  FlowerBouquetTemplate,
  StarCollectorTemplate,
} from './';

interface TemplateRendererProps {
  templateId: string;
  recipientName: string;
  accentColor: string;
  envelopeColor?: string;
  onOpen: () => void;
}

export function TemplateRenderer({
  templateId,
  recipientName,
  accentColor,
  envelopeColor = '#d4a574',
  onOpen,
}: TemplateRendererProps) {
  const commonProps = {
    recipientName,
    accentColor,
    onOpen,
  };

  switch (templateId) {
    // Multi-interaction templates (NEW!)
    case 'birthday-cake':
      return <BirthdayCakeTemplate {...commonProps} />;
    
    case 'treasure-chest':
      return <TreasureChestTemplate {...commonProps} />;
    
    case 'flower-bouquet':
      return <FlowerBouquetTemplate {...commonProps} />;
    
    case 'star-collector':
      return <StarCollectorTemplate {...commonProps} />;

    // Single interaction templates
    case 'gift-box':
      return <GiftBoxTemplate {...commonProps} />;
    
    case 'magic-card':
      return <MagicCardTemplate {...commonProps} />;
    
    case 'heart-box':
      return <HeartBoxTemplate {...commonProps} />;
    
    case 'scroll':
      return <ScrollTemplate {...commonProps} />;
    
    case 'balloon-pop':
      return <BalloonTemplate {...commonProps} />;
    
    case 'envelope':
    default:
      return (
        <EnvelopeTemplate 
          {...commonProps}
          envelopeColor={envelopeColor}
        />
      );
  }
}
