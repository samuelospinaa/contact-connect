import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md iridescent grain" />
            <span className="font-display text-xl">tapt.</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Contactless cards for people who'd rather be remembered.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/ai-tools" className="hover:text-accent">AI Tools</Link></li>
            <li><Link to="/strategy" className="hover:text-accent">Strategy</Link></li>
            <li><Link to="/journey" className="hover:text-accent">Customer Journey</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/supply-chain" className="hover:text-accent">Pipeline & ROI</Link></li>
            <li><Link to="/legal" className="hover:text-accent">Legal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>© 2026 tapt. All rights reserved.</li>
            <li>Made for eBusiness class.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
