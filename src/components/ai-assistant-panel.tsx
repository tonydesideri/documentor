"use client";

import { useState } from "react";
import { AlertCircle, Info, Sparkles, Search, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AiAssistantPanelProps {
  sectionName: string;
  onClose?: () => void;
}

export function AiAssistantPanel({ sectionName }: AiAssistantPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateExample = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Assistente IA</h2>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">
            Sugestões
          </h3>

          <Card className="shadow-none">
            <CardContent className="px-3 space-y-3">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm">
                  Considere incluir métricas de sucesso para o produto.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm">
                  A seção de público-alvo precisa ser mais específica.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">
            Ações Rápidas
          </h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
              onClick={handleGenerateExample}
              disabled={isGenerating}
            >
              <Sparkles className="h-4 w-4 text-purple-500" />
              <div className="flex-1">
                <p className="font-medium">
                  Gerar exemplo de {sectionName.toLowerCase()}
                </p>
              </div>
              {isGenerating && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <Search className="h-4 w-4 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium">Analisar conteúdo</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <Wand2 className="h-4 w-4 text-amber-500" />
              <div className="flex-1">
                <p className="font-medium">Melhorar redação</p>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .loading {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid currentColor;
          border-bottom-color: transparent;
          border-radius: 50%;
          animation: rotation 1s linear infinite;
        }

        .loading-xs {
          width: 0.75rem;
          height: 0.75rem;
          border-width: 1.5px;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
