import React, { useEffect, useState } from 'react';
import { 
  X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, 
  ChevronLeft, CheckCircle, User, Mail, 
  Phone, Send, AlertCircle, ExternalLink, RefreshCw, Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = 'cart' | 'details' | 'success';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  telegram: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [lastOrderUrl, setLastOrderUrl] = useState('');
  
  // Checkout State
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    telegram: ''
  });

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
        setStep('cart');
        // Reset form on close
        setCustomerInfo({ name: '', email: '', phone: '', telegram: '' });
      }, 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleTelegramCheckout = () => {
    // Format: • `Item Name` - `$Price`
    const itemsList = cartItems.map(item => `• \`${item.name}\` - \`$${item.price}\``).join('\n');
    
    // Telegram MarkdownV2 style: **bold**, `monospace`
    const message = `🛍️ **New Order Request**

**Order Details:**
${itemsList}
----------------
**Total:** \`$${total.toFixed(2)}\`

**Customer Info:**
👤 Name: \`${customerInfo.name}\`
📧 Email: \`${customerInfo.email}\`
📱 Phone: \`${customerInfo.phone}\`
💬 Telegram: \`${customerInfo.telegram || 'N/A'}\`

I would like to purchase these items.`;

    const telegramUrl = `https://t.me/messagebotkhbot?text=${encodeURIComponent(message)}`;
    setLastOrderUrl(telegramUrl);
    window.open(telegramUrl, '_blank');
    
    setStep('success');
    // Note: We do NOT clear cart here anymore. We wait for user confirmation.
  };

  const handleFinishOrder = () => {
    clearCart();
    onClose();
  };

  const handleBack = () => {
    if (step === 'details') setStep('cart');
  };

  const canContinue = customerInfo.name && customerInfo.email && customerInfo.phone;

  if (!visible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`relative w-full max-w-md h-full bg-vault-card border-l border-vault-border shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-vault-border/50 bg-vault-dark/50 backdrop-blur-md sticky top-0 z-10">
           <div className="flex items-center gap-3">
             {step !== 'cart' && step !== 'success' && (
               <button 
                onClick={handleBack}
                className="p-1 -ml-2 text-slate-400 hover:text-white transition-colors"
               >
                 <ChevronLeft className="w-5 h-5" />
               </button>
             )}
             <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
               {step === 'cart' && <><ShoppingBag className="w-5 h-5 text-vault-neon" /> Your Cart <span className="text-slate-500 text-sm font-sans font-normal">({cartItems.length})</span></>}
               {step === 'details' && <><User className="w-5 h-5 text-vault-accent" /> Customer Info</>}
               {step === 'success' && <><CheckCircle className="w-5 h-5 text-emerald-500" /> Order Sent?</>}
             </h2>
           </div>
           <button 
             onClick={onClose}
             className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
           >
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-vault-card/95 relative">
           
           {/* VIEW: CART LIST */}
           {step === 'cart' && (
             <div className="p-6 h-full flex flex-col">
               {cartItems.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                    <div className="w-20 h-20 rounded-full bg-vault-dark border border-vault-border flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-slate-600" />
                    </div>
                    <p className="text-lg font-medium text-slate-300">Your cart is empty</p>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">Looks like you haven't added any digital goods yet.</p>
                    <button 
                      onClick={onClose}
                      className="mt-6 px-8 py-3 bg-vault-neon/10 border border-vault-neon text-vault-neon rounded font-bold uppercase tracking-wider hover:bg-vault-neon hover:text-vault-dark transition-all"
                    >
                      Start Browsing
                    </button>
                 </div>
               ) : (
                 <div className="space-y-4">
                   {cartItems.map((item, index) => (
                     <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-vault-dark/40 border border-vault-border/50 rounded-xl group hover:border-vault-neon/30 hover:bg-vault-dark/60 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                        {/* Image */}
                        <div className="w-24 h-24 bg-vault-dark rounded-lg overflow-hidden shrink-0 border border-vault-border/30 relative group-hover:border-vault-neon/20 transition-colors">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                          />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                           <div>
                             <h4 className="font-display font-bold text-white text-base leading-tight mb-1">{item.name}</h4>
                             <span className="inline-block px-2 py-0.5 rounded bg-vault-neon/10 border border-vault-neon/10 text-vault-neon text-[10px] font-mono tracking-wider uppercase">
                               {item.category}
                             </span>
                           </div>
                           
                           <div className="flex items-end justify-between mt-2">
                             <div className="flex flex-col">
                               <span className="text-[10px] text-slate-500 font-mono uppercase">Price</span>
                               <span className="font-display font-bold text-xl text-white tracking-wide">${item.price}</span>
                             </div>
                             
                             <button 
                               onClick={() => removeFromCart(item.id)}
                               className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/5 text-red-400 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 transition-all text-xs font-medium group/btn"
                               aria-label={`Remove ${item.name}`}
                             >
                               <Trash2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                               <span>Remove</span>
                             </button>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           )}

           {/* VIEW: DETAILS FORM */}
           {step === 'details' && (
             <div className="p-6 animate-in fade-in slide-in-from-right-8 duration-300">
               <div className="space-y-6">
                  
                  {/* Bot Start Prompt */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm text-blue-200 font-medium">Important First Step</p>
                      <p className="text-xs text-blue-300/80 leading-relaxed">
                        To receive your order, you must start our Telegram bot first.
                      </p>
                      <a 
                        href="https://t.me/messagebotkhbot" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wide group"
                      >
                        Start Bot Now <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-500 uppercase">Full Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          className="w-full bg-vault-dark border border-vault-border rounded-lg py-3 pl-10 pr-4 text-white focus:border-vault-neon focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-500 uppercase">Email Address <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                          type="email" 
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          className="w-full bg-vault-dark border border-vault-border rounded-lg py-3 pl-10 pr-4 text-white focus:border-vault-neon focus:outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-500 uppercase">Phone Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                          type="tel" 
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          className="w-full bg-vault-dark border border-vault-border rounded-lg py-3 pl-10 pr-4 text-white focus:border-vault-neon focus:outline-none transition-colors"
                          placeholder="+855 12 345 678"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-500 uppercase">Telegram Username <span className="text-slate-600 normal-case">(Optional)</span></label>
                      <div className="relative">
                        <Send className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          name="telegram"
                          value={customerInfo.telegram}
                          onChange={handleInputChange}
                          className="w-full bg-vault-dark border border-vault-border rounded-lg py-3 pl-10 pr-4 text-white focus:border-vault-neon focus:outline-none transition-colors"
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  </div>
               </div>
             </div>
           )}

           {/* VIEW: SUCCESS */}
           {step === 'success' && (
             <div className="p-6 flex flex-col items-center justify-center h-full text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-white">Did the order send?</h3>
                  <p className="text-slate-400 text-sm">
                    We've opened Telegram. If you didn't see the message, ensure you started the bot.
                  </p>
                </div>

                <div className="w-full space-y-3">
                  {/* Start Bot Reminder */}
                   <a 
                     href="https://t.me/messagebotkhbot" 
                     target="_blank" 
                     rel="noreferrer"
                     className="block w-full py-3 px-4 bg-vault-dark/50 border border-dashed border-vault-border hover:border-blue-500/50 hover:bg-blue-500/5 rounded-lg text-xs text-slate-400 hover:text-blue-300 transition-all"
                   >
                     1. <span className="underline">Start Bot</span> (@messagebotkhbot)
                   </a>

                   {/* Retry Button */}
                   <button 
                     onClick={() => window.open(lastOrderUrl, '_blank')}
                     className="w-full py-3 px-4 bg-vault-dark border border-vault-border hover:border-vault-neon text-white rounded-lg font-bold uppercase text-sm tracking-wide flex items-center justify-center gap-2 transition-all"
                   >
                     <RefreshCw className="w-4 h-4" /> 2. Retry Order
                   </button>
                </div>

                <button 
                  onClick={handleFinishOrder}
                  className="w-full py-4 bg-vault-neon text-vault-dark font-bold uppercase rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Yes, Order Sent
                </button>
             </div>
           )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-vault-border/50 bg-vault-dark/50 backdrop-blur-md">
           
           {step === 'cart' && cartItems.length > 0 && (
             <div className="space-y-4">
               <div className="flex justify-between items-end">
                 <span className="text-base font-bold text-white">Total</span>
                 <span className="text-3xl font-display font-bold text-vault-neon tracking-tight">${total.toFixed(2)}</span>
               </div>
               
               {/* Delivery Information Block */}
               <div className="bg-vault-card/50 border border-vault-border rounded-lg p-3 flex gap-3 items-center">
                 <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <Zap className="w-4 h-4 text-emerald-400" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-200">Instant Delivery</span>
                    <span className="text-[10px] text-slate-500">Most orders processed within 5 minutes</span>
                 </div>
               </div>

               <button 
                 onClick={() => setStep('details')}
                 className="w-full py-4 bg-vault-neon text-vault-dark font-bold font-display text-lg uppercase tracking-wide rounded shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
               >
                 Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
           )}

           {step === 'details' && (
             <button 
               onClick={handleTelegramCheckout}
               disabled={!canContinue}
               className={`w-full py-4 font-bold font-display text-lg uppercase tracking-wide rounded transition-all flex items-center justify-center gap-2 ${canContinue ? 'bg-[#229ED9] text-white hover:bg-[#1E88BC] shadow-[0_0_20px_rgba(34,158,217,0.3)]' : 'bg-vault-border text-slate-500 cursor-not-allowed'}`}
             >
               <Send className="w-5 h-5" /> Proceed to Telegram
             </button>
           )}

           {(step === 'cart' || step === 'details') && (
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-4">
                <ShieldCheck className="w-3 h-3" /> Secure Order Processing
              </div>
           )}
        </div>
      </div>
    </div>
  );
};