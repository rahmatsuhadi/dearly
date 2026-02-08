'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, Type, Palette, Eye, Heart, Star, PartyPopper, ScrollText, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button, Card, Textarea } from '@/components/ui';
import { Input } from '@/components/ui';
import { Stepper } from '@/components/shared';
import { CATEGORIES, FONTS, ACCENT_COLORS, ENVELOPE_STYLES, getCategoryById } from '@/lib/constants';
import { CARD_TEMPLATES } from '@/lib/templates';
import { TemplateRenderer } from '@/components/templates/template-renderer';

const steps = [
  { id: 1, name: 'Kategori', icon: Sparkles },
  { id: 2, name: 'Template', icon: Palette },
  { id: 3, name: 'Konten', icon: Type },
  { id: 4, name: 'Desain', icon: Palette },
  { id: 5, name: 'Preview', icon: Eye },
];

interface CardFormData {
  category: string;
  template: string;
  recipientName: string;
  senderName: string;
  title: string;
  message: string;
  font: string;
  accentColor: string;
  envelopeStyle: string;
}

export default function CreateCardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [cardData, setCardData] = useState<CardFormData>({
    category: '',
    template: 'envelope',
    recipientName: '',
    senderName: '',
    title: '',
    message: '',
    font: 'default',
    accentColor: '#f43f5e',
    envelopeStyle: 'kraft',
  });

  const updateField = <K extends keyof CardFormData>(field: K, value: CardFormData[K]) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!cardData.category;
      case 2: return !!cardData.template;
      case 3: return !!cardData.recipientName && !!cardData.message;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else router.back();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
      });

      if (response.ok) {
        toast.success('Kartu berhasil dibuat!');
        router.push('/dashboard/cards');
      } else {
        throw new Error('Gagal membuat kartu');
      }
    } catch {
      toast.error('Gagal membuat kartu. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card padding="lg">
            {/* Step 1: Category */}
            {currentStep === 1 && (
              <CategoryStep 
                selected={cardData.category} 
                onSelect={(v) => updateField('category', v)} 
              />
            )}

            {/* Step 2: Template */}
            {currentStep === 2 && (
              <TemplateStep 
                selected={cardData.template} 
                onSelect={(v) => updateField('template', v)} 
              />
            )}

            {/* Step 3: Content */}
            {currentStep === 3 && (
              <ContentStep 
                data={cardData} 
                onChange={updateField} 
              />
            )}

            {/* Step 4: Design */}
            {currentStep === 4 && (
              <DesignStep 
                data={cardData} 
                onChange={updateField} 
              />
            )}

            {/* Step 5: Preview */}
            {currentStep === 5 && (
              <PreviewStep data={cardData} />
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="ghost" onClick={handleBack} leftIcon={<ArrowLeft className="w-5 h-5" />}>
          {currentStep === 1 ? 'Batal' : 'Kembali'}
        </Button>

        {currentStep < 5 ? (
          <Button 
            onClick={handleNext} 
            disabled={!canProceed()}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Lanjut
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            isLoading={isSubmitting}
            rightIcon={<Check className="w-5 h-5" />}
          >
            Buat Kartu
          </Button>
        )}
      </div>
    </div>
  );
}

// Step Components
function CategoryStep({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Pilih Kategori</h2>
      <p className="text-text-secondary mb-6">Untuk momen apa kartu ini dibuat?</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                selected === cat.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-border hover:border-primary-300'
              }`}
            >
              <div 
                className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                <IconComponent className="w-7 h-7" style={{ color: cat.color }} />
              </div>
              <span className="font-medium text-text-primary">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TemplateStep({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Pilih Template Interaktif</h2>
      <p className="text-text-secondary mb-6">Pilih gaya animasi pembukaan kartu - semakin banyak interaksi, semakin seru!</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CARD_TEMPLATES.map((template) => {
          const IconComponent = template.icon;
          const isMultiInteraction = template.interactions > 1;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`relative p-4 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
                selected === template.id
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-border hover:border-primary-300'
              }`}
            >
              {/* Interaction Badge */}
              {isMultiInteraction && (
                <div 
                  className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white shadow-md"
                  style={{ backgroundColor: template.previewColor }}
                >
                  {template.interactions}x tap
                </div>
              )}
              
              <div 
                className="w-12 h-12 mb-3 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${template.previewColor}20` }}
              >
                <IconComponent className="w-6 h-6" style={{ color: template.previewColor }} />
              </div>
              <h3 className="font-semibold text-text-primary text-sm">{template.name}</h3>
              <p className="text-xs text-text-tertiary mt-1 line-clamp-2">{template.description}</p>
              
              {/* Category Tag */}
              <div className="mt-2">
                <span 
                  className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ 
                    backgroundColor: `${template.previewColor}15`,
                    color: template.previewColor
                  }}
                >
                  {template.category === 'celebration' && (
                    <>
                      <PartyPopper className="w-3 h-3" />
                      Perayaan
                    </>
                  )}
                  {template.category === 'romantic' && (
                    <>
                      <Heart className="w-3 h-3" />
                      Romantis
                    </>
                  )}
                  {template.category === 'playful' && (
                    <>
                      <Wand2 className="w-3 h-3" />
                      Interaktif
                    </>
                  )}
                  {template.category === 'classic' && (
                    <>
                      <ScrollText className="w-3 h-3" />
                      Klasik
                    </>
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ContentStep({ 
  data, 
  onChange 
}: { 
  data: CardFormData; 
  onChange: <K extends keyof CardFormData>(field: K, value: CardFormData[K]) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Tulis Pesanmu</h2>
      <p className="text-text-secondary mb-6">Sampaikan perasaanmu dengan kata-kata</p>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nama Penerima"
            value={data.recipientName}
            onChange={(e) => onChange('recipientName', e.target.value)}
            placeholder="Untuk siapa kartu ini?"
          />
          <Input
            label="Nama Pengirim"
            value={data.senderName}
            onChange={(e) => onChange('senderName', e.target.value)}
            placeholder="Dari siapa?"
          />
        </div>

        <Input
          label="Judul Kartu"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Contoh: Happy Birthday Sayang!"
        />

        <Textarea
          label="Pesan Utama"
          rows={5}
          value={data.message}
          onChange={(e) => onChange('message', e.target.value)}
          placeholder="Tulis pesan yang ingin kamu sampaikan..."
        />
      </div>
    </div>
  );
}

function DesignStep({ 
  data, 
  onChange 
}: { 
  data: CardFormData; 
  onChange: <K extends keyof CardFormData>(field: K, value: CardFormData[K]) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Kustomisasi Desain</h2>
      <p className="text-text-secondary mb-6">Sesuaikan tampilan kartumu</p>
      
      <div className="space-y-6">
        {/* Font Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">Font</label>
          <div className="flex flex-wrap gap-3">
            {FONTS.map((font) => (
              <button
                key={font.id}
                onClick={() => onChange('font', font.id)}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  data.font === font.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-border hover:border-primary-300'
                }`}
                style={{ fontFamily: font.family }}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">Warna Aksen</label>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => onChange('accentColor', color.value)}
                className={`w-10 h-10 rounded-full transition-transform ${
                  data.accentColor === color.value ? 'scale-110 ring-2 ring-offset-2 ring-primary-500' : ''
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Envelope Style (only show for envelope template) */}
        {data.template === 'envelope' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Gaya Amplop</label>
            <div className="flex flex-wrap gap-3">
              {ENVELOPE_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => onChange('envelopeStyle', style.id)}
                  className={`px-4 py-3 rounded-xl border-2 flex items-center gap-2 transition-all ${
                    data.envelopeStyle === style.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-border hover:border-primary-300'
                  }`}
                >
                  <div 
                    className="w-6 h-6 rounded border border-border"
                    style={{ backgroundColor: style.color }}
                  />
                  {style.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewStep({ data }: { data: CardFormData }) {
  const [previewOpened, setPreviewOpened] = useState(false);
  const category = getCategoryById(data.category);
  const font = FONTS.find(f => f.id === data.font);
  const CategoryIcon = category?.icon;
  const envelopeStyle = ENVELOPE_STYLES.find(s => s.id === data.envelopeStyle);

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Preview Kartu</h2>
      <p className="text-text-secondary mb-6">Lihat hasil akhir kartumu - coba klik untuk melihat animasi!</p>
      
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-xl p-8 min-h-[600px] flex items-center justify-center overflow-hidden relative">
        {/* Background Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full opacity-20"
              style={{ 
                backgroundColor: data.accentColor,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`
              }}
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity,
                delay: i * 0.5 
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!previewOpened ? (
            <TemplateRenderer
              templateId={data.template}
              recipientName={data.recipientName || 'Nama Penerima'}
              accentColor={data.accentColor}
              envelopeColor={envelopeStyle?.color}
              onOpen={() => setPreviewOpened(true)}
            />
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
              className="relative max-w-md w-full"
            >
              {/* Floating Sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 0.5 + i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  style={{ 
                    top: `${20 + i * 15}%`, 
                    left: i % 2 === 0 ? '-10%' : '100%',
                  }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: data.accentColor }} />
                </motion.div>
              ))}

              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Decorative Corner Patterns */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${data.accentColor}, transparent 70%)`,
                  }}
                />

                {/* Header with Gradient */}
                <div 
                  className="relative h-40 flex items-center justify-center overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${data.accentColor}, ${data.accentColor}cc, ${data.accentColor}99)` 
                  }}
                >
                  {/* Animated Background Shapes */}
                  <motion.div
                    className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20"
                    style={{ backgroundColor: 'white' }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      x: [0, 10, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-16 -right-10 w-40 h-40 rounded-full opacity-10"
                    style={{ backgroundColor: 'white' }}
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />

                  {/* Icon with Glow */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                    className="relative z-10"
                  >
                    <div className="absolute inset-0 rounded-3xl blur-xl opacity-50 bg-white" />
                    <div className="relative w-20 h-20 rounded-3xl bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      {CategoryIcon ? (
                        <CategoryIcon className="w-10 h-10 text-white drop-shadow-lg" />
                      ) : (
                        <Heart className="w-10 h-10 text-white fill-white drop-shadow-lg" />
                      )}
                    </div>
                  </motion.div>

                  {/* Sparkle Decorations */}
                  <motion.div
                    className="absolute top-4 left-6"
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5 text-white/40" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 right-6"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <Star className="w-4 h-4 text-white/40 fill-white/20" />
                  </motion.div>
                </div>

                {/* Body Content */}
                <div className="relative px-6 py-8">
                  {/* Decorative Divider */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <motion.div 
                      className="w-10 h-0.5 rounded-full"
                      style={{ backgroundColor: data.accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: 40 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: 'spring' }}
                    >
                      <Heart className="w-3 h-3" style={{ color: data.accentColor, fill: data.accentColor }} />
                    </motion.div>
                    <motion.div 
                      className="w-10 h-0.5 rounded-full"
                      style={{ backgroundColor: data.accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: 40 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    />
                  </div>

                  {/* Recipient */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mb-4"
                  >
                    <span className="text-xs text-gray-400 tracking-wider uppercase">Untuk yang tersayang</span>
                    <p 
                      className="text-lg font-display font-semibold mt-1"
                      style={{ color: data.accentColor }}
                    >
                      {data.recipientName || 'Nama Penerima'}
                    </p>
                  </motion.div>

                  {/* Title */}
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-2xl font-bold mb-5"
                    style={{ fontFamily: font?.family, color: '#1a1a2e' }}
                  >
                    {data.title || 'Judul Kartu'}
                  </motion.h3>
                  
                  {/* Message */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <div 
                      className="absolute -top-3 -left-1 text-4xl font-serif opacity-10"
                      style={{ color: data.accentColor }}
                    >
                      "
                    </div>
                    <p 
                      className="text-gray-600 whitespace-pre-wrap leading-relaxed text-center px-3"
                      style={{ fontFamily: font?.family }}
                    >
                      {data.message || 'Pesan kartumu akan muncul di sini...'}
                    </p>
                    <div 
                      className="absolute -bottom-4 -right-1 text-4xl font-serif opacity-10 rotate-180"
                      style={{ color: data.accentColor }}
                    >
                      "
                    </div>
                  </motion.div>
                  
                  {/* Sender Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-6 h-px bg-gray-200" />
                      <Heart className="w-2 h-2" style={{ color: data.accentColor, fill: data.accentColor }} />
                      <div className="w-6 h-px bg-gray-200" />
                    </div>
                    <span className="text-gray-400 text-xs">Dengan penuh cinta,</span>
                    <p 
                      className="text-lg font-display font-semibold mt-0.5"
                      style={{ color: data.accentColor, fontFamily: font?.family }}
                    >
                      {data.senderName || 'Nama Pengirim'}
                    </p>
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Heart className="w-3 h-3 fill-current" style={{ color: data.accentColor }} />
                    </motion.div>
                    <p className="text-xs text-gray-400">
                      Dibuat dengan cinta di{' '}
                      <span className="font-semibold" style={{ color: data.accentColor }}>Cardify</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Reset Preview Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 text-center"
              >
                <button
                  onClick={() => setPreviewOpened(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: `${data.accentColor}15`,
                    color: data.accentColor
                  }}
                >
                  <span>↻</span>
                  Lihat animasi lagi
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
