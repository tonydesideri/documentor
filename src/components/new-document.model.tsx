"use client";

import { useState } from "react";
import {
  Cloud,
  Cpu,
  Globe,
  Info,
  List,
  Smartphone,
  SquarePen,
  WandSparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface NewDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateDocument: (document: {
    name: string;
    type: string[];
    template: string;
  }) => void;
}

export function NewDocumentModal({
  open,
  onOpenChange,
  onCreateDocument,
}: NewDocumentModalProps) {
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState<string[]>([]);
  const [documentTemplate, setDocumentTemplate] = useState("");

  const handleSubmit = () => {
    if (documentName && documentType && documentTemplate) {
      onCreateDocument({
        name: documentName,
        type: documentType,
        template: documentTemplate,
      });
      // Resetar os campos após a criação
      setDocumentName("");
      setDocumentType([]);
      setDocumentTemplate("");
      onOpenChange(false);
    }
  };

  // Tipos de projeto disponíveis
  const documentTypes = [
    {
      value: "web",
      label: "Web",
      icon: <Globe size={24} className="h-8 w-8 text-gray-500" />,
    },
    {
      value: "mobile",
      label: "Mobile",
      icon: <Smartphone size={24} className="h-8 w-8 text-gray-500" />,
    },
    {
      value: "iot",
      label: "IoT",
      icon: <Cpu size={24} className="h-8 w-8 text-gray-500" />,
    },
    {
      value: "saas",
      label: "SaaS",
      icon: <Cloud size={24} className="h-8 w-8 text-gray-500" />,
    },
  ];

  // Templates disponíveis
  const templates = [
    {
      value: "agile",
      label: "Template Ágil",
      badge: "Ágil",
      badgeColor: "bg-green-100 text-green-800",
      description: "Ideal para projetos Scrum e Kanban",
      icon: <Zap size={24} className="h-6 w-6 text-gray-500" />,
    },
    {
      value: "traditional",
      label: "Template Tradicional",
      badge: "Tradicional",
      badgeColor: "bg-blue-100 text-blue-800",
      description: "Para metodologia em cascata",
      icon: <List size={24} className="h-6 w-6 text-gray-500" />,
    },
    {
      value: "custom",
      label: "Template Personalizado",
      badge: "Personalizado",
      badgeColor: "bg-purple-100 text-purple-800",
      description: "Crie seu próprio template",
      icon: <WandSparkles size={24} className="h-6 w-6 text-gray-500" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl">Criar Novo Documento</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="document-name">Nome do Documento</Label>
            <Input
              id="document-name"
              placeholder="Digite o nome do documento"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Tipo de Projeto</Label>
            <Alert className="border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
              <Info className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-300" />
              <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                Esta seleção ajuda a inteligência artificial a entender melhor o
                contexto do documento e refinar suas sugestões na escrita da
                documentação.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-4 gap-3">
              {documentTypes.map((type) => (
                <div
                  key={type.value}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-3 text-center transition-all hover:border-primary ${
                    documentType.includes(type.value)
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() =>
                    setDocumentType((prev) =>
                      prev.includes(type.value)
                        ? prev.filter((v) => v !== type.value)
                        : [...prev, type.value]
                    )
                  }
                >
                  {type.icon}
                  <span className="mt-2 text-sm font-medium">{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Template Base</Label>
            <div className="grid grid-cols-3 gap-3">
              {templates.map((template) => (
                <div
                  key={template.value}
                  className={`flex cursor-pointer flex-col rounded-md border p-4 transition-all hover:border-primary ${
                    documentTemplate === template.value
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setDocumentTemplate(template.value)}
                >
                  <div className="mb-2 flex items-center gap-2">
                    {template.icon}
                    <Badge className={template.badgeColor}>
                      {template.badge}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium">{template.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !documentName || !documentType.length || !documentTemplate
            }
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <SquarePen />
            Começar a Documentar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
