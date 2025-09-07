import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Crown, X } from "lucide-react";

export default function PremiumModal({ isOpen, onClose, language }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              {language === "marathi" ? "प्रीमियम" : "प्रीमियम"}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              {language === "marathi" 
                ? "प्रीमियम सदस्यता घ्या आणि अधिक सामग्रीचा आनंद घ्या"
                : "प्रीमियम सदस्यता लें और अधिक सामग्री का आनंद लें"
              }
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm">{language === "marathi" ? "जाहिरातीरहित अनुभव" : "विज्ञापन मुक्त अनुभव"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm">{language === "marathi" ? "सर्व प्रीमियम सामग्री" : "सभी प्रीमियम सामग्री"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm">{language === "marathi" ? "ऑफलाइन डाउनलोड" : "ऑफलाइन डाउनलोड"}</span>
              </div>
            </div>
            <Button className="w-full">
              {language === "marathi" ? "प्रीमियम खरेदी करा" : "प्रीमियम खरीदें"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
