import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function CheckoutModal({
  open,
  onOpenChange,
  card
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  card: { name: string; desc: string; gradient: string } | null;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", url: "", address: "" });

  const handlePay = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const handleClose = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => setSuccess(false), 300); // reset state after closing animation
    }
    onOpenChange(newOpen);
  };

  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-card text-card-foreground border-border">
        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
            <h2 className="text-3xl font-display mb-2">Payment Successful</h2>
            <p className="text-muted-foreground mb-8">
              Your custom <strong>{card.name}</strong> is being manufactured. We'll email you the tracking details soon.
            </p>
            <Button onClick={() => handleClose(false)} className="rounded-full px-8">Close</Button>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">Customize & Order</DialogTitle>
              <DialogDescription>
                Finalize your NFC card details before securely checking out.
              </DialogDescription>
            </DialogHeader>

            <div className="my-6">
              <div className="p-4 rounded-xl border border-border bg-secondary/30 flex gap-4 items-center mb-6">
                <div className="w-20 h-12 rounded-md shadow-sm shrink-0" style={{ background: card.gradient }} />
                <div>
                  <div className="font-medium">{card.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{card.desc}</div>
                </div>
                <div className="ml-auto font-medium">€49.00</div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Alex Rivera" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="url">Target URL</Label>
                  <Input 
                    id="url" 
                    placeholder="https://linkedin.com/in/alex" 
                    value={formData.url} 
                    onChange={e => setFormData({...formData, url: e.target.value})} 
                  />
                  <p className="text-[10px] text-muted-foreground">This is where people go when they tap your card.</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Innovation Dr, NY 10001" 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={handlePay} 
                disabled={loading || !formData.name || !formData.url || !formData.address}
                className="w-full rounded-full h-12 text-md"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {loading ? "Processing..." : "Pay with Stripe (Simulated)"}
              </Button>
              <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                🔒 Secured by Stripe
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
