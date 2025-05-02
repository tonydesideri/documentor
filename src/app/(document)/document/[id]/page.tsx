"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Clock,
  Eye,
  FileDown,
  History,
  Save,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { RichTextEditor } from "@/components/rich-text-editor";
import { AiAssistantPanel } from "@/components/ai-assistant-panel";
import { useParams } from "next/navigation";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

// TODO: Transformar em async para melhorar o params conforme documentação
export default function Page() {
  const params = useParams();

  const [activeSection, setActiveSection] = useState("visao");
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);

  // Dados de exemplo para as seções do documento
  const sections = [
    { id: "visao", name: "Visão do Produto", status: "completed" },
    { id: "requisitos", name: "Requisitos", status: "in-progress" },
    { id: "casos-uso", name: "Casos de Uso", status: "warning" },
    { id: "arquitetura", name: "Arquitetura", status: "pending" },
    { id: "api", name: "Documentação de API", status: "pending" },
    { id: "implementacao", name: "Implementação", status: "pending" },
    { id: "testes", name: "Testes", status: "pending" },
  ];

  // Dados de exemplo para os colaboradores
  const collaborators = [
    { id: 1, name: "João Silva", avatar: "/placeholder.svg", online: true },
    { id: 2, name: "Maria Souza", avatar: "/placeholder.svg", online: true },
    {
      id: 3,
      name: "Carlos Oliveira",
      avatar: "/placeholder.svg",
      online: false,
    },
  ];

  // Função para renderizar o ícone de status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
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

  // Função para obter o prompt baseado na seção ativa
  const getSectionPrompt = (sectionId: string) => {
    const prompts: Record<string, string> = {
      visao:
        "Prompt: Descreva a visão geral do produto, incluindo seu propósito principal e público-alvo.",
      requisitos:
        "Prompt: Liste os requisitos funcionais e não-funcionais do sistema. Seja específico e use linguagem clara.",
      "casos-uso":
        "Prompt: Descreva os principais casos de uso do sistema. Inclua atores, fluxos principais e alternativos.",
      arquitetura:
        "Prompt: Descreva a arquitetura do sistema, incluindo componentes, interfaces e fluxo de dados.",
      api: "Prompt: Documente as APIs do sistema, incluindo endpoints, parâmetros, respostas e exemplos.",
    };
    return prompts[sectionId] || "Prompt: Descreva esta seção do documento.";
  };

  return (
    <SidebarInset className="overflow-hidden">
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
                <BreadcrumbPage>
                  API de Pagamentos - Documentação Técnica
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-2 px-2">
          <Button variant="ghost" asChild>
            <Link href={`/document/${params.id}/view`}>
              <Eye />
              Visualizar
            </Link>
          </Button>
          <Button variant="ghost">
            <FileDown />
            Exportar
          </Button>
          <Button variant="ghost">
            <Settings />
            Configurações
          </Button>
        </div>
      </header>

      <main className="flex flex-1">
        {/* Sidebar Esquerda - Listagem de Seções */}
        <div
          className={`border-r transition-all duration-300 ${
            leftPanelOpen ? "w-64" : "w-0 -ml-3 opacity-0"
          }`}
        >
          {leftPanelOpen && (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Seções</h2>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4 flex flex-col gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className={`flex w-full items-center justify-between rounded-md p-2 text-left text-sm transition-colors hover:bg-muted ${
                        activeSection === section.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <div className="flex items-center gap-2 ">
                        {renderStatusIcon(section.status)}
                        <span>{section.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Botão para expandir/colapsar sidebar esquerda */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 rounded-none rounded-r-md border border-l-0 bg-background p-0"
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              leftPanelOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
          <span className="sr-only">Toggle left sidebar</span>
        </Button>

        {/* Área Central - Editor */}
        <div className="flex-1 overflow-hidden py-4 px-12">
          <div className="flex h-full flex-col">
            <div className="sticky top-0 z-30 bg-background p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">
                    {sections.find((s) => s.id === activeSection)?.name}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    / Versão 1.2
                  </span>
                  <Badge
                    className={getStatusClass(
                      sections.find((s) => s.id === activeSection)?.status ||
                        "pending"
                    )}
                  >
                    {getStatusText(
                      sections.find((s) => s.id === activeSection)?.status ||
                        "pending"
                    )}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <AvatarGroup>
                    {collaborators.map((collaborator) => (
                      <div key={collaborator.id} className="relative">
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarImage
                            src={collaborator.avatar || "/placeholder.svg"}
                            alt={collaborator.name}
                          />
                          <AvatarFallback>
                            {collaborator.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {collaborator.online && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                        )}
                      </div>
                    ))}
                  </AvatarGroup>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <History className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Histórico</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button className="gap-2" asChild>
                    <Link
                      href={`/document/${params?.id}/revisar/${activeSection}`}
                    >
                      <Save className="h-4 w-4" />
                      <span>Salvar e Continuar</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="mx-auto">
                <RichTextEditor prompt={getSectionPrompt(activeSection)} />
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Painel Direito - Assistente IA */}
        <div
          className={`border-l bg-background transition-all duration-300 ${
            rightPanelOpen ? "w-80" : "w-0 -mr-3 opacity-0"
          }`}
        >
          {rightPanelOpen && (
            <AiAssistantPanel
              sectionName={
                sections.find((s) => s.id === activeSection)?.name || ""
              }
            />
          )}
        </div>

        {/* Botão para expandir/colapsar painel direito */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 z-10 h-8 w-4 -translate-y-1/2 rounded-none rounded-l-md border border-r-0 bg-background p-0"
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              rightPanelOpen ? "-rotate-90" : "rotate-90"
            }`}
          />
          <span className="sr-only">Toggle right sidebar</span>
        </Button>
      </main>
    </SidebarInset>
  );
}
