/**
 * TODO: Cast Views model
 */
export const views = {
    overviewPage: {
        title: "Bem-vindo, {{firstName}}",
        subTitle: "Gerenciar e configurar as suas definições de utilizador para personalizar a Identidade do Servidor de experiência",
        sections: {
            personalInfo: {
                header: "Informações Pessoais",
                description: "Gerenciar informações básicas, como seu nome e foto, que você usar. E as associações de contas etc ..."
            },
            accountSecurity: {
                header: "Gerenciar A Segurança",
                description: "Configurar a conta de medidas de segurança, como Senha, Opções de Recuperação de Conta, MFA etc ..."
            },
            applications: {
                header: "Consentimento De Gestão",
                description: "Monitorar e gerenciar a conta de atividades, ativos e inativos, Gerir, dado autorizações etc ..."
            }
        }
    },
    personalInfoPage: {
        title: "Informações pessoais",
        subTitle: "Gerenciar informações sobre você, sua sub perfis e sua conta em geral"
    },
    applicationsPage: {
        title: "Aplicações",
        subTitle: "Gerenciar e manter seus aplicativos"
    },
    securityPage: {
        title: "Segurança",
        subTitle: "Configurações de atualização para tornar a sua conta segura",
        multiFactor: {
            title: "Multi-factor authentication",
            subTitle: "Ver e Gerir as suas multi-factor authentication opções",
            smsOtp: {
                title: "SMS OTP",
                description: "Você receberá uma mensagem de texto contendo o código de verificação",
                notification: {
                    success: {
                        message: "Número De Celular Atualizado Com Sucesso",
                        description: "O número de telemóvel, o perfil de usuário é atualizado com êxito."
                    },
                    error: {
                        message: "Ocorreu um erro !!!",
                        description: "Ocorreu um erro durante a actualização do número de celular."
                    }
                }
            },
            fido: {
                title: "FIDO",
                description: "Autenticar-se através da ligação de um FIDO chave"
            }
        }
    },
    accountsPage: {
        title: "Contas",
        subTitle: "Gerenciar e atualizar a sua conta de segurança"
    },
    sessionsPage: {
        title: "Sessões",
        subTitle: "Sessões ativas no momento e o histórico da sessão"
    },
    consentManagementPage: {
        title: "Consentimento de gestão",
        subTitle: "Gerenciar consentido aplicações e sites"
    },
    operationsPage: {
        title: "Operações",
        subTitle: "Gerenciar e manter as tarefas pendentes aprovações, etc."
    },
    changePassword: {
        title: "Alteração de senha",
        subTitle: "Alterar e modificar a palavra-passe existente",
        actionTitles: {
            change: "Altere sua senha"
        },
        forms: {
            passwordResetForm: {
                inputs: {
                    currentPassword: {
                        label: "Palavra-passe actual",
                        placeholder: "Introduza a palavra-passe actual",
                        validations: {
                            invalid: "A senha atual é inválida",
                            empty: "A senha atual é um campo obrigatório"
                        }
                    },
                    newPassword: {
                        label: "Nova palavra-passe",
                        placeholder: "Introduza a nova palavra-passe",
                        validations: {
                            empty: "Nova palavra-passe é um campo obrigatório"
                        }
                    },
                    confirmPassword: {
                        label: "Confirmar senha",
                        placeholder: "Introduza a nova palavra-passe",
                        validations: {
                            empty: "Confirmar palavra-passe, é um campo obrigatório",
                            mismatch: "A confirmação de palavra-passe não corresponde"
                        }
                    }
                },
                validations: {
                    submitSuccess: {
                        message: "Redefinição de senha sucesso",
                        description: "A senha foi alterada com sucesso"
                    },
                    submitError: {
                        message: "Redefinição de senha erro",
                        description: "{{description}}"
                    },
                    invalidCurrentPassword: {
                        message: "Redefinição de senha erro",
                        description: "A actual palavra-passe que introduziu parece ser inválido. Por favor, tente novamente"
                    },
                    genericError: {
                        message: "Redefinição de senha erro",
                        description: "Alguma coisa saiu errada. Por favor, tente novamente."
                    }
                }
            }
        },
        modals: {
            confirmationModal: {
                heading: "Confirmação",
                message: "Alterar a palavra-passe irá resultar no encerramento da sessão atual. Você terá que iniciar sessão com a nova palavra-passe alterada. Deseja continuar?"
            }
        }
    },
    consentManagement: {
        title: "Consentiu aplicações",
        subTitle: "Gerenciar consentido aplicações e sites",
        description: "Ver e Gerir consentido aplicações da sua conta",
        actionTitles: {
            empty: "Você não autorizado a qualquer aplicação"
        },
        modals: {
            consentRevokeModal: {
                heading: "Revogar {{appName}}?",
                message: "Tem certeza de que deseja revogar esse consentimento? Esta operação não é reversível."
            },
            editConsentModal: {
                description: {
                    state: "Estado",
                    collectionMethod: "O Método De Coleta De",
                    version: "Versão",
                    description: "Descrição",
                    piiCategoryHeading: "As informações que você compartilhou com a aplicação"
                }
            }
        },
        placeholders: {
            emptyConsentList: {
                heading: "Você não autorizado a qualquer aplicação"
            }
        },
        notifications: {
            consentedAppsFetchGenericError: {
                message: "Alguma coisa saiu errada",
                description: "Não foi possível carregar a lista de consentiu aplicações."
            },
            consentedAppsFetchError: {
                message: "Alguma coisa saiu errada",
                description: "{{description}}"
            },
            consentReceiptFetchGenericError: {
                message: "Alguma coisa saiu errada",
                description: "Não foi possível carregar informações sobre o aplicativo selecionado."
            },
            consentReceiptFetchError: {
                message: "Alguma coisa saiu errada",
                description: "{{description}}"
            },
            revokeConsentedAppSuccess: {
                message: "Consentimento Revogar Sucesso",
                description: "O consentimento tem sido revogado para a aplicação."
            },
            revokeConsentedAppGenericError: {
                message: "Alguma coisa saiu errada",
                description: "Não podia revogar o consentimento para a aplicação."
            },
            revokeConsentedAppError: {
                message: "Consentimento Revogar Erro",
                description: "{{description}}"
            },
            updateConsentedClaimsSuccess: {
                message: "Consentiu reivindicações atualizado com sucesso",
                description: "O consentiu que afirma ter sido atualizado com êxito para a aplicação."
            },
            updateConsentedClaimsGenericError: {
                message: "Alguma coisa saiu errada",
                description: "O consentiu declarações de falha ao atualizar para o aplicativo."
            },
            updateConsentedClaimsError: {
                message: "Alguma coisa saiu errada",
                description: "{{description}}"
            }
        }
    },
    securityQuestions: {
        title: "Perguntas de segurança",
        description: "Adicionar e Atualização de Recuperação de Conta do Desafio de Perguntas",
        actionTitles: {
            configure: "Configurar questões de segurança",
            change: "Alterar perguntas de segurança"
        },
        forms: {
            securityQuestionsForm: {
                inputs: {
                    question: {
                        label: "Pergunta",
                        placeholder: "Selecione uma pergunta de segurança",
                        validations: {
                            empty: "Pelo menos uma pergunta de segurança devem ser selecionados"
                        }
                    },
                    answer: {
                        label: "Responder",
                        placeholder: "Digite sua resposta",
                        validations: {
                            empty: "A resposta é um campo obrigatório"
                        }
                    }
                }
            }
        },
        notification: {
            addQuestions: {
                success: {
                    description: "A segurança necessária perguntas foram adicionados com êxito.",
                    message: "Perguntas de segurança foram adicionados com êxito."
                },
                error: {
                    description: "Ocorreu um erro !!!",
                    message: "Ocorreu um erro ao configurar as perguntas de segurança"
                }
            },
            updateQuestions: {
                success: {
                    description: "A segurança necessária perguntas foram atualizados com êxito.",
                    message: "Perguntas de segurança foram atualizados com êxito."
                },
                error: {
                    description: "Ocorreu um erro !!!",
                    message: "Ocorreu um erro ao atualizar as perguntas de segurança"
                }
            }
        },
        placeholders: {
            emptyQuestionsList: {
                heading: "Falha ao carregar qualquer perguntas de segurança"
            }
        },
        dropDown: {
            label: "Selecione uma Pergunta"
        },
        noConfiguration: "Sem perguntas de segurança configurada para este usuário"
    },
    userProfile: {
        title: "Perfil",
        subTitle: "Gerenciar e atualizar seu perfil básico de informações.",
        personalInfoTitle: "Informações Pessoais",
        forms: {
            nameChangeForm: {
                inputs: {
                    firstName: {
                        label: "Primeiro Nome",
                        placeholder: "Digite o primeiro nome",
                        validations: {
                            empty: "O primeiro nome é um campo obrigatório"
                        }
                    },
                    lastName: {
                        label: "Último Nome",
                        placeholder: "Insira o último nome",
                        validations: {
                            empty: "O último nome é um campo obrigatório"
                        }
                    }
                }
            },
            emailChangeForm: {
                inputs: {
                    email: {
                        label: "E-mail",
                        placeholder: "Digite seu endereço de e-mail",
                        validations: {
                            empty: "Endereço de e-mail é um campo obrigatório"
                        }
                    }
                }
            },
            organizationChangeForm: {
                inputs: {
                    organization: {
                        label: "Organização",
                        placeholder: "Introduza a sua organização",
                        validations: {
                            empty: "Organização é um campo obrigatório"
                        }
                    }
                }
            },
            mobileChangeForm: {
                inputs: {
                    mobile: {
                        label: "Número de celular",
                        placeholder: "Digite o seu número de telemóvel",
                        validations: {
                            empty: "Número de telemóvel é um campo obrigatório"
                        }
                    }
                }
            }
        },
        fields: {
            name: {
                label: "Nome",
                default: "Adicionar nome"
            },
            email: {
                label: "E-mail",
                default: "Adicionar o e-mail"
            },
            username: {
                label: "Nome de usuário",
                default: "Adicionar nome de utilizador"
            },
            organization: {
                label: "Organização",
                default: "Adicionar organização"
            },
            mobile: {
                label: "Número de celular",
                default: "Adicionar o número de telefone móvel"
            },
            emptyField: "Por favor, preencha este campo"
        },
        personalDetails: {
            noDetails: "Nenhuma Informação Pessoal Configurada para este Usuário"
        },
        notification: {
            getProfileInfo: {
                success: {
                    message: "Perfil de usuário detalhes obtidos com êxito.",
                    description: "Necessário perfil de usuário detalhes são recuperados com sucesso."
                },
                error: {
                    message: "Ocorreu um erro !!!",
                    description: "Ocorreu um erro ao recuperar os detalhes do perfil."
                }
            },
            updateProfileInfo: {
                success: {
                    message: "Perfil de usuário atualizado com êxito.",
                    description: "Necessário perfil de usuário detalhes foram atualizados com êxito."
                },
                error: {
                    message: "Ocorreu um erro !!!",
                    description: "Ocorreu um erro ao atualizar o perfil de usuário detalhes"
                }
            }
        }
    },
    associatedAccounts: {
        title: "Contas vinculadas",
        subTitle: "Gerencie todas as suas contas vinculadas em um só lugar.",
        actionTitle: "Adicionar uma conta",
        accountTypes: {
            local: {
                label: "Adicionar a conta de utilizador local"
            }
        },
        forms: {
            addAccountForm: {
                inputs: {
                    username: {
                        label: "Nome de usuário",
                        placeholder: "Introduza o nome de utilizador",
                        validations: {
                            empty: "Nome de usuário é um campo obrigatório"
                        }
                    },
                    password: {
                        label: "Palavra-passe",
                        placeholder: "Introduza a palavra-passe",
                        validations: {
                            empty: "A senha é um campo obrigatório"
                        }
                    }
                }
            }
        },
        notification: {
            getAssociation: {
                success: {
                    message: "Conta de usuário associada recuperados com sucesso.",
                    description: "Necessário perfil de usuário detalhes são recuperados com sucesso."
                },
                error: {
                    message: "Ocorreu um erro !!!",
                    description: "Ocorreu um erro ao recuperar as vinculadas contas de usuário."
                }
            },
            addAssociation: {
                success: {
                    message: "Conta de usuário associada adicionado com êxito.",
                    description: "O Associado obrigatório de conta de usuário adicionado com êxito."
                },
                error: {
                    message: "Ocorreu um erro !!!",
                    description: "Ocorreu um erro ao adicionar a conta vinculada."
                }
            }
        }
    },
    userSessions: {
        title: "Sessões de usuários ativos",
        subTitle: "Esta é uma lista de dispositivos que foram ativos na sua conta.",
        actionTitles: {
            terminateAll: "Encerrar todas as sessões",
            empty: "Você não tem nenhum sessões ativas"
        },
        description: "Ver e Gerir sessões ativas de sua conta",
        browserAndOS: "{{browser}} na {{os}} {{version}}",
        lastAccessed: "Último acesso {{date}}",
        notifications: {
            fetchSessions: {
                success: {
                    message: "Sessão de utilizador recuperação bem-sucedida.",
                    description: "Recuperado com êxito as sessões de usuário."
                },
                error: {
                    message: "Erro ao recuperar sessão de usuário.",
                    description: "{{description}}"
                },
                genericError: {
                    message: "Alguma coisa saiu errada.",
                    description: "Não foi possível recuperar qualquer de sessões de usuário."
                }
            },
            terminateAllUserSessions: {
                success: {
                    message: "Terminadas todas as sessões de usuário.",
                    description: "Terminada com êxito todas as sessões de usuário."
                },
                error: {
                    message: "Não conseguia terminar as sessões de usuário.",
                    description: "{{description}}"
                },
                genericError: {
                    message: "Não conseguia terminar as sessões de usuário.",
                    description: "Algo deu errado enquanto a terminar as sessões de usuário."
                }
            },
            terminateUserSession: {
                success: {
                    message: "Sessão terminar sucesso.",
                    description: "Finalizada com sucesso a sessão do usuário."
                },
                error: {
                    message: "Não poderia encerrar a sessão do usuário.",
                    description: "{{description}}"
                },
                genericError: {
                    message: "Não poderia encerrar a sessão do usuário.",
                    description: "Algo deu errado enquanto que encerra a sessão do usuário."
                }
            }
        },
        placeholders: {
            emptySessionList: {
                heading: "Não há sessões ativas para este usuário"
            }
        },
        modals: {
            terminateAllUserSessionsModal: {
                heading: "Confirmação",
                message: "Essa ação vai fazer você sair de todas as sessões em cada dispositivo. Deseja continuar?"
            },
            terminateUserSessionModal: {
                heading: "Confirmação",
                message: "Esta ação irá sessão fora da sessão no dispositivo específico. Deseja continuar?"
            }
        }
    },
    404: {
        title: "Parece que você está perdido. :(",
        subTitle: "A página que você está procurando não está aqui."
    },
    profileExport: {
        title: "Perfil de exportação",
        subTitle: "O Download de todos os dados do seu perfil, incluindo dados pessoais, perguntas de segurança e autorizações.",
        actionTitle: "Exportar os dados do perfil",
        notification: {
            downloadProfileInfo: {
                success: {
                    message: "Perfil de usuário detalhes transferido com êxito.",
                    description: "Necessário perfil de usuário detalhes são transferidos com êxito."
                },
                error: {
                    message: "Ocorreu um erro !!!",
                    description: "Ocorreu um erro ao baixar o perfil de usuário de detalhes."
                }
            }
        }
    },
    pendingApprovals: {
        title: "Aprovações pendentes",
        subTitle: "Você pode gerenciar pendentes aprovações aqui",
        listHelper: "Mostrando aprovações no estado {{status}}",
        notifications: {
            fetchPendingApprovals: {
                success: {
                    message: "Pendentes aprovações de obtenção de sucesso",
                    description: "Recuperado com êxito aprovações pendentes"
                },
                error: {
                    message: "Erro ao obter aprovações pendentes",
                    description: "{{description}}"
                },
                genericError: {
                    message: "Alguma coisa saiu errada",
                    description: "Não conseguia obter aprovações pendentes"
                }
            },
            updatePendingApprovals: {
                success: {
                    message: "Actualização bem sucedida",
                    description: "Atualizado com êxito a aprovação"
                },
                error: {
                    message: "Erro ao actualizar a aprovação",
                    description: "{{description}}"
                },
                genericError: {
                    message: "Alguma coisa saiu errada",
                    description: "Não foi possível atualizar a aprovação"
                }
            },
            fetchApprovalDetails: {
                success: {
                    message: "Aprovação detalhes de obtenção de sucesso",
                    description: "Recuperado com êxito a aprovação detalhes"
                },
                error: {
                    message: "Erro ao obter a aprovação detalhes",
                    description: "{{description}}"
                },
                genericError: {
                    message: "Alguma coisa saiu errada",
                    description: "Não foi possível atualizar a aprovação detalhes"
                }
            }
        },
        placeholders: {
            emptyApprovalList: {
                heading: "Você não tem nenhum {{status}} aprovações pendentes"
            }
        }
    }
};
