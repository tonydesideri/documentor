"use client";
import {
  Badge,
  Check,
  Download,
  FileText,
  FileType,
  Globe,
  X,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
  const params = useParams();

  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeVersionNumber, setIncludeVersionNumber] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(false);

  // Dados de exemplo para as seções do documento
  const sections = [
    { id: "visao", name: "Visão Geral", status: "completed" },
    { id: "requisitos", name: "Requisitos", status: "completed" },
    { id: "casos-uso", name: "Casos de Uso", status: "in-progress" },
    { id: "arquitetura", name: "Arquitetura", status: "warning" },
    { id: "api", name: "Documentação de API", status: "pending" },
  ];

  // Estado para controlar quais seções estão selecionadas
  const [selectedSections, setSelectedSections] = useState<string[]>(
    sections.map((section) => section.id)
  );

  // Função para verificar se uma seção está selecionada
  const isSectionSelected = (sectionId: string) => {
    return selectedSections.includes(sectionId);
  };

  // Função para alternar a seleção de uma seção
  const toggleSection = (sectionId: string) => {
    if (selectedSections.includes(sectionId)) {
      setSelectedSections(selectedSections.filter((id) => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  // Função para selecionar ou desselecionar todas as seções
  const toggleAllSections = () => {
    if (selectedSections.length === sections.length) {
      setSelectedSections([]);
    } else {
      setSelectedSections(sections.map((section) => section.id));
    }
  };

  // Função para obter a classe de cor do status
  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  // Função para obter o texto do status
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "in-progress":
        return "Em Progresso";
      case "warning":
        return "Atenção";
      case "pending":
        return "Pendente";
      default:
        return "Pendente";
    }
  };

  return (
    <SidebarInset className="overflow-hidden">
      {/* Cabeçalho fixo */}
      <header className="flex h-14 shrink-0 items-center gap-2 border-b justify-between">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Documentos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/document/${params.id}`}>
                  API de Pagamentos - Documentação Técnica
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Exportar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex gap-2 px-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/document/${params.id}`}>
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar</span>
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 gap-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Cabeçalho */}
          <div className="items-center gap-3 mb-8">
            <h1 className="text-2xl font-bold">Exportar Documento</h1>
            <p className="text-muted-foreground">
              Selecione as opções para exportar seu documento
            </p>
          </div>

          <div className="space-y-6">
            {/* Formato de Arquivo */}
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Formato do Arquivo</CardTitle>
                <CardDescription>
                  Escolha o formato para exportar seu documento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                  className="grid grid-cols-1 gap-4 md:grid-cols-3"
                >
                  <div>
                    <RadioGroupItem
                      value="pdf"
                      id="pdf"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="pdf"
                      className="flex cursor-pointer items-center justify-between rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">PDF</p>
                          <p className="text-xs text-muted-foreground">
                            Documento formatado para impressão
                          </p>
                        </div>
                      </div>
                      <Check
                        className={`h-5 w-5 text-primary ${
                          selectedFormat === "pdf" ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="markdown"
                      id="markdown"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="markdown"
                      className="flex cursor-pointer items-center justify-between rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <FileType className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Markdown</p>
                          <p className="text-xs text-muted-foreground">
                            Texto formatado para edição
                          </p>
                        </div>
                      </div>
                      <Check
                        className={`h-5 w-5 text-primary ${
                          selectedFormat === "markdown"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="html"
                      id="html"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="html"
                      className="flex cursor-pointer items-center justify-between rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">HTML</p>
                          <p className="text-xs text-muted-foreground">
                            Site interativo com navegação
                          </p>
                        </div>
                      </div>
                      <Check
                        className={`h-5 w-5 text-primary ${
                          selectedFormat === "html"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Seções do Documento */}
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Seções do Documento</CardTitle>
                <CardDescription>
                  Selecione as seções que deseja incluir na exportação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all-sections"
                      checked={selectedSections.length === sections.length}
                      onCheckedChange={toggleAllSections}
                    />
                    <Label htmlFor="all-sections" className="font-medium">
                      Selecionar todas as seções
                    </Label>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={section.id}
                            checked={isSectionSelected(section.id)}
                            onCheckedChange={() => toggleSection(section.id)}
                            disabled={section.status === "pending"}
                          />
                          <Label
                            htmlFor={section.id}
                            className={
                              section.status === "pending"
                                ? "text-muted-foreground"
                                : ""
                            }
                          >
                            {section.name}
                          </Label>
                        </div>
                        <Badge className={getStatusClass(section.status)}>
                          {getStatusText(section.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opções Avançadas */}
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Opções Avançadas</CardTitle>
                <CardDescription>
                  Personalize a exportação do seu documento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-summary">Incluir Sumário</Label>
                      <p className="text-sm text-muted-foreground">
                        Adiciona um sumário no início do documento
                      </p>
                    </div>
                    <Switch
                      id="include-summary"
                      checked={includeSummary}
                      onCheckedChange={setIncludeSummary}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-version">
                        Incluir Número de Versão
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Adiciona o número da versão atual no cabeçalho
                      </p>
                    </div>
                    <Switch
                      id="include-version"
                      checked={includeVersionNumber}
                      onCheckedChange={setIncludeVersionNumber}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-metadata">
                        Incluir Metadados
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Adiciona informações como autor, data de criação e
                        última modificação
                      </p>
                    </div>
                    <Switch
                      id="include-metadata"
                      checked={includeMetadata}
                      onCheckedChange={setIncludeMetadata}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
              <Button variant="outline" asChild>
                <Link href={`/document/${params.id}`}>Cancelar</Link>
              </Button>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                <span>Exportar Agora</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
