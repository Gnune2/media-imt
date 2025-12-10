# 🎓 Calculadora de Média Acadêmica

Este é um projeto de sistema web focado em ajudar estudantes universitários a gerenciar e calcular suas médias acadêmicas por disciplina, utilizando um sistema de cálculo ponderado (por peso).

## ✨ Funcionalidades

O site oferece as seguintes funcionalidades principais, garantindo que o aluno possa acompanhar seu desempenho de forma precisa e personalizada:

### 1. Sistema de Acesso Individual

* **Cadastro e Login:** Cada aluno pode criar uma conta individual e fazer login para ter um espaço pessoal seguro.
* **Segurança:** A autenticação é realizada utilizando **JSON Web Tokens (JWT)** para sessões seguras e senhas são armazenadas com **bcrypt** (criptografia forte).
* **Persistência de Dados:** Todas as informações do aluno (matérias, notas e médias) são salvas em um **banco de dados** e vinculadas à sua conta de forma exclusiva.

### 2. Gerenciamento de Matérias Personalizado

Após o login, o aluno pode:

* **Criar Novas Matérias:** Adicionar qualquer disciplina de sua grade curricular.
* **Detalhes da Matéria:**
    * Definir um **Nome** para a matéria.
    * Adicionar uma **Imagem/Ícone** para personalização visual.
* **Configuração de Avaliações (Pesos):**
    * O aluno define o **número de provas/trabalhos** que a matéria terá.
    * É possível atribuir um **peso (relevância)** diferente para cada prova ou trabalho, permitindo o uso de **média ponderada** no cálculo.
* **Cálculo da Média Ponderada:** O sistema calcula automaticamente a média final da matéria com base nas notas e nos pesos definidos.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando a seguinte pilha tecnológica moderna:

| Categoria | Tecnologia | Uso Principal |
| :--- | :--- | :--- |
| **Backend** | **Node.js** | Ambiente de execução do servidor. |
| **Framework** | **Express.js** | Estrutura para criar a API REST. |
| **Banco de Dados** | **MongoDB** | Banco de dados NoSQL para armazenar dados flexíveis de usuários e matérias. |
| **ORM/ODMs** | **Prisma** | Camada de abstração do banco de dados (embora Prisma seja mais comum com SQL, será usado para tipagem e esquemas). |
| **Linguagem** | **JavaScript** | Linguagem principal para o desenvolvimento frontend e backend. |
| **Segurança** | **bcrypt** | Criptografia (hash) de senhas. |
| **Autenticação** | **JSON Web Tokens (JWT)** | Geração e verificação de tokens de sessão. |
| **Comunicação** | **CORS** | Configuração de Cross-Origin Resource Sharing para requisições frontend/backend. |
| **Frontend** | **HTML, CSS** | Estrutura e Estilização base da interface. |
| **Design** | **Bootstrap** | Framework CSS para layout responsivo e componentes pré-estilizados. |

---
