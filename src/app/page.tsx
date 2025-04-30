import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, FileDown, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

export default function Page() {
  const projects = [
    {
      id: 1,
      name: "API de Pagamentos - Documentação Técnica",
      progress: 75,
      lastEdited: "2025-04-25T14:30:00",
      status: "Em progresso",
    },
    {
      id: 2,
      name: "Manual do Usuário - Sistema de Gestão",
      progress: 100,
      lastEdited: "2025-04-20T09:15:00",
      status: "Concluído",
    },
    {
      id: 3,
      name: "Documentação de Arquitetura - Microserviços",
      progress: 45,
      lastEdited: "2025-04-28T16:45:00",
      status: "Em progresso",
    },
    {
      id: 4,
      name: "Guia de Integração - SDK Mobile",
      progress: 30,
      lastEdited: "2025-04-27T11:20:00",
      status: "Em progresso",
    },
    {
      id: 5,
      name: "Especificação Técnica - Novo Produto",
      progress: 10,
      lastEdited: "2025-04-29T08:00:00",
      status: "Iniciado",
    },
  ];

  const collaborators = [
    { id: 1, name: "João Silva", avatar: "/placeholder.svg", online: true },
    { id: 2, name: "Maria Souza", avatar: "/placeholder.svg", online: true },
    {
      id: 3,
      name: "Carlos Oliveira",
      avatar: "/placeholder.svg",
      online: false,
    },
    { id: 4, name: "Ana Santos", avatar: "/placeholder.svg", online: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-100";
      case "Em progresso":
        return "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100";
      case "Iniciado":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100";
      default:
        return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "[&>div]:bg-emerald-500 bg-gray-200 dark:[&>div]:bg-emerald-700 dark:bg-gray-200";
      case "Em progresso":
        return "[&>div]:bg-blue-700 bg-gray-200 dark:[&>div]:bg-blue-800 dark:bg-gray-200";
      case "Iniciado":
        return "[&>div]:bg-yellow-500 bg-gray-200 dark:[&>div]:bg-yellow-800 dark:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    // TODO: Colocar o header como fixo no top
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Documentos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-6 py-8 px-14">
        <div className="flex justify-end items-center mb-2">
          <Button
            className="gap-2"
            // onClick={() => setNewProjectModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Novo Documento
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-1">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-semibold line-clamp-2">{project.name}</h3>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
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
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>Progresso</span>
                      <span>{project.progress}%</span>
                    </div>
                  </div>

                  <Progress
                    value={project.progress}
                    className={`h-2 ${getProgressColor(project.status)}`}
                  />
                  <p className="text-sm text-muted-foreground">
                    Última edição: {formatDate(project.lastEdited)}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/projeto/${project.id}`}>Continuar</Link>
                </Button>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <FileDown />
                </Button>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Trash2 />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </SidebarInset>
  );
}
