"use client";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Clock,
  FileDown,
  X,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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

export default function Page() {
  const params = useParams();

  const [leftPanelOpen, setLeftPanelOpen] = useState(true);

  // Dados de exemplo para as seções do documento
  const sections = [
    {
      id: "visao",
      name: "Visão do Produto",
      status: "completed",
      content: `
        <h1>Visão do Produto</h1>
        <p>Este documento descreve a API de Pagamentos, um sistema projetado para processar transações financeiras de forma segura e eficiente. A API oferece uma interface para integração com diversos sistemas de pagamento, permitindo que aplicações realizem operações como pagamentos, reembolsos, consultas de saldo e histórico de transações.</p>
        
        <h2>Objetivos</h2>
        <p>O objetivo principal da API de Pagamentos é fornecer uma solução robusta e escalável para processamento de transações financeiras, atendendo às necessidades de empresas de diversos portes. Os objetivos específicos incluem:</p>
        <ul>
          <li>Processar pagamentos de forma segura e confiável</li>
          <li>Oferecer suporte a múltiplos métodos de pagamento</li>
          <li>Garantir conformidade com regulamentações financeiras</li>
          <li>Fornecer relatórios detalhados de transações</li>
          <li>Integrar-se facilmente com sistemas existentes</li>
        </ul>
        
        <h2>Público-Alvo</h2>
        <p>Este documento é destinado a:</p>
        <ul>
          <li>Desenvolvedores que irão integrar seus sistemas com a API</li>
          <li>Arquitetos de software responsáveis pelo design do sistema</li>
          <li>Gerentes de projeto que supervisionam a implementação</li>
          <li>Equipes de QA responsáveis por testar a integração</li>
        </ul>
      `,
    },
    {
      id: "requisitos",
      name: "Requisitos",
      status: "completed",
      content: `
        <h1>Requisitos</h1>
        <p>Os requisitos funcionais descrevem as funcionalidades que o sistema deve oferecer:</p>
        
        <h2>Requisitos Funcionais</h2>
        
        <h3>RF01 - Processamento de Pagamentos</h3>
        <p>O sistema deve permitir o processamento de pagamentos através de diferentes métodos:</p>
        <ul>
          <li>Cartão de crédito (Visa, Mastercard, American Express)</li>
          <li>Cartão de débito</li>
          <li>Transferência bancária</li>
          <li>Boleto bancário</li>
          <li>Carteiras digitais (Apple Pay, Google Pay)</li>
          <li>PIX</li>
        </ul>
        
        <h3>RF02 - Gestão de Reembolsos</h3>
        <p>O sistema deve permitir o processamento de reembolsos totais ou parciais para transações realizadas:</p>
        <ul>
          <li>Reembolso total do valor da transação</li>
          <li>Reembolso parcial com valor especificado</li>
          <li>Cancelamento de transações pendentes</li>
          <li>Histórico de reembolsos realizados</li>
        </ul>
        
        <h2>Requisitos Não-Funcionais</h2>
        
        <h3>RNF01 - Segurança</h3>
        <ul>
          <li>Todas as comunicações devem ser criptografadas usando TLS 1.3 ou superior</li>
          <li>Dados sensíveis devem ser armazenados de forma criptografada</li>
          <li>Conformidade com PCI-DSS para processamento de cartões</li>
          <li>Implementação de autenticação em dois fatores para acesso administrativo</li>
          <li>Registro de auditoria para todas as operações sensíveis</li>
        </ul>
      `,
    },
    {
      id: "casos-uso",
      name: "Casos de Uso",
      status: "in-progress",
      content: `
        <h1>Casos de Uso</h1>
        
        <h2>UC01 - Processar Pagamento</h2>
        <p><strong>Ator Principal:</strong> Cliente</p>
        <p><strong>Atores Secundários:</strong> Sistema de Pagamento, Gateway Financeiro</p>
        <p><strong>Pré-condições:</strong></p>
        <ul>
          <li>Cliente autenticado no sistema</li>
          <li>Dados de pagamento válidos</li>
        </ul>
        
        <p><strong>Fluxo Principal:</strong></p>
        <ol>
          <li>Cliente seleciona produtos/serviços para compra</li>
          <li>Cliente escolhe método de pagamento</li>
          <li>Cliente fornece dados necessários para o pagamento</li>
          <li>Sistema valida os dados fornecidos</li>
          <li>Sistema envia solicitação para o gateway de pagamento</li>
          <li>Gateway processa a transação</li>
          <li>Sistema recebe confirmação do gateway</li>
          <li>Sistema registra a transação como concluída</li>
          <li>Sistema notifica o cliente sobre o sucesso da transação</li>
        </ol>
      `,
    },
    {
      id: "arquitetura",
      name: "Arquitetura",
      status: "warning",
      content: `
        <h1>Arquitetura</h1>
        
        <h2>Visão Geral da Arquitetura</h2>
        <p>A API de Pagamentos segue uma arquitetura de microserviços, com componentes independentes que se comunicam através de APIs RESTful e mensageria assíncrona. A arquitetura foi projetada para ser escalável, resiliente e de alta disponibilidade.</p>
        
        <h2>Componentes Principais</h2>
        
        <h3>1. API Gateway</h3>
        <p>Serve como ponto de entrada único para todas as solicitações externas. Responsável por:</p>
        <ul>
          <li>Roteamento de solicitações para os serviços apropriados</li>
          <li>Autenticação e autorização</li>
          <li>Rate limiting e throttling</li>
          <li>Logging e monitoramento</li>
        </ul>
        
        <h3>2. Serviço de Autenticação</h3>
        <p>Gerencia a autenticação e autorização de usuários e sistemas. Responsável por:</p>
        <ul>
          <li>Emissão e validação de tokens JWT</li>
          <li>Gerenciamento de credenciais de API</li>
          <li>Controle de acesso baseado em funções (RBAC)</li>
        </ul>
      `,
    },
    {
      id: "api",
      name: "Documentação de API",
      status: "pending",
      content: `
        <h1>Documentação de API</h1>
        <p>Esta seção ainda está em desenvolvimento.</p>
      `,
    },
  ];

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

  return (
    <SidebarInset className="overflow-auto h-[98dvh]">
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
                <BreadcrumbPage>Visualização</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex gap-2 px-2">
          <Button variant="ghost">
            <FileDown />
            Exportar
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/document/${params.id}`}>
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Conteúdo principal com índice lateral e documento */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Esquerda - Listagem de Seções */}
        <div
          className={`border-r transition-all duration-300 ${
            leftPanelOpen ? "w-64" : "w-0 -ml-3 opacity-0"
          }`}
        >
          {leftPanelOpen && (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Índice</h2>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4 flex flex-col gap-2">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className={`flex w-full items-center justify-between rounded-md p-2 text-left text-sm`}
                    >
                      <div className="flex items-center gap-2 ">
                        {renderStatusIcon(section.status)}
                        <span>{section.name}</span>
                      </div>
                    </div>
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

        {/* Conteúdo do documento */}
        <ScrollArea className="flex-1">
          <div className="mx-auto max-w-4xl px-6 py-8">
            {/* Título do documento */}
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold">API de Pagamentos</h1>
              <p className="mt-2 text-muted-foreground">Documentação Técnica</p>
            </div>

            {/* Seções do documento */}
            <div className="space-y-12">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={`section-${section.id}`}
                  className="scroll-mt-20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getStatusClass(section.status)}>
                      {getStatusText(section.status)}
                    </Badge>
                  </div>
                  <div
                    className="prose prose-slate dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content.trim() }}
                  />
                  {section.id !== sections[sections.length - 1].id && (
                    <Separator className="mt-12" />
                  )}
                </section>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      {/* Estilos para impressão */}
      <style jsx global>{`
        @media print {
          header,
          .fixed {
            display: none !important;
          }
          .prose {
            max-width: none !important;
          }
          html,
          body {
            background: white !important;
            color: black !important;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            page-break-after: avoid;
            break-after: avoid;
          }
          p,
          li {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          section {
            page-break-before: always;
            break-before: always;
          }
          section:first-of-type {
            page-break-before: avoid;
            break-before: avoid;
          }
        }
      `}</style>
    </SidebarInset>
  );
}
