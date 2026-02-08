'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, Type, Palette, Eye, Heart, Star, PartyPopper, ScrollText, Wand2, Bot, Loader2, X } from 'lucide-react';
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
  status: 'draft' | 'published';
}

export default function EditCardPage() {
  const router = useRouter();
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
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
    status: 'draft',
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`/api/cards/${params.id}`);
        if (!res.ok) throw new Error("Gagal mengambil data kartu");
        
        const data = await res.json();
        
        // Map API data to form data
        setCardData({
          category: data.category,
          template: data.templateId, // Note: API returns templateId
          recipientName: data.recipientName || '',
          senderName: data.senderName || '',
          title: data.title,
          message: data.message,
          font: data.fontFamily || 'default', // Note: API returns fontFamily
          accentColor: data.textColor || '#f43f5e', // Note: API uses textColor for accent
          envelopeStyle: data.envelopeStyle || 'kraft',
          status: data.status,
        });
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat kartu");
        router.push('/dashboard/cards');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCard();
    }
  }, [params.id, router]);

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
      const response = await fetch(`/api/cards/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
      });

      if (response.ok) {
        toast.success('Kartu berhasil diperbarui!');
        router.push('/dashboard/cards');
      } else {
        throw new Error('Gagal memperbarui kartu');
      }
    } catch {
      toast.error('Gagal memperbarui kartu. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Edit Kartu</h1>
        <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/cards')}>
          Batal
        </Button>
      </div>

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
          Kembali
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
            Simpan Perubahan
          </Button>
        )}
      </div>
    </div>
  );
}

// Reuse components from Create Page (copy-pasted for independence)
// Ideally these should be extracted to shared components, but for speed we duplicate logic here
// but update imports/icons as needed.

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
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('Puitis & Romantis');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMessage = async () => {
    if (!data.recipientName) {
      toast.error("Mohon isi nama penerima terlebih dahulu");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/cards/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: data.category,
          recipientName: data.recipientName,
          senderName: data.senderName,
          userPrompt: aiPrompt,
          tone: aiTone
        }),
      });

      const result = await response.json();

      if (response.ok) {
        onChange('message', result.message);
        setShowAiModal(false);
        toast.success("Pesan berhasil dibuat!");
      } else {
        throw new Error(result.error || "Gagal membuat pesan");
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghubungkan ke AI. Pastikan kunci API sudah diatur.");
    } finally {
      setIsGenerating(false);
    }
  };

  const tones = [
    "Puitis & Romantis",
    "Lucu & Humoris",
    "Formal & Sopan",
    "Singkat & Padat",
    "Penuh Semangat"
  ];

  return (
    <div className="relative">
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

        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-primary">Pesan Utama</label>
            <button
              onClick={() => setShowAiModal(true)}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Bantu Tulis (AI)</span>
            </button>
          </div>
          <Textarea
            rows={5}
            value={data.message}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="Tulis pesan yang ingin kamu sampaikan..."
            className="w-full"
          />
        </div>
      </div>

      <AnimatePresence>
        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="flex items-center gap-2 text-indigo-700">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-semibold">AI Magic Writer</h3>
                </div>
                <button 
                  onClick={() => setShowAiModal(false)}
                  className="p-1 hover:bg-white/50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gaya Bahasa
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setAiTone(tone)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          aiTone === tone
                            ? 'bg-indigo-100 border-indigo-200 text-indigo-700 font-medium'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detail Tambahan (Opsional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                    rows={3}
                    placeholder="Contoh: Dia suka kucing, hobi memasak, dan kita sudah berteman 10 tahun..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                </div>

                <button
                  onClick={generateMessage}
                  disabled={isGenerating}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sedang Menulis...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Buat Pesan Sekarang
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
            <div className="text-center">
              <p className="text-lg font-bold mb-4">Preview Mode</p>
              <Button onClick={() => setPreviewOpened(false)}>Coba Lagi</Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
