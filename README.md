# Amazon - Scraper

## Documentação do Projeto


### Descrição
Este projeto consiste em um sistema de scraping para obter informações sobre os três primeiros produtos da página de mais vendidos da Amazon Brasil e disponibilizar esses dados através de uma API. O scraping é realizado utilizando o Puppeteer para extrair informações da página web, e os dados são armazenados no banco de dados DynamoDB da AWS. A API é implementada utilizando o Serverless Framework, AWS Lambda e API Gateway.


### Requerimentos
- Node.js
- Serverless Framework
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB
- Puppeteer

  
### Funcionamento

Scraper: O script App.js é responsável por realizar o scraping da página de mais vendidos da Amazon Brasil. Ele utiliza o Puppeteer para abrir um navegador, navegar até a página de mais vendidos, e extrair informações como número, nome, estrelas, avaliações e preço dos três primeiros produtos listados. Esses dados são então armazenados no banco de dados DynamoDB.
API: O Serverless Framework é utilizado para criar uma API que disponibiliza os dados obtidos pelo scraper. Uma função AWS Lambda é implementada para responder às requisições HTTP com os dados armazenados no DynamoDB. O API Gateway é utilizado para gerenciar a API e rotear as requisições para a função Lambda correspondente.


### Como Executar

Certifique-se de ter Node.js instalado na sua máquina.
Instale o Serverless Framework globalmente executando o comando npm install -g serverless.
Clone o repositório do projeto e navegue até o diretório raiz.
Configure suas credenciais da AWS executando aws configure e seguindo as instruções.
Instale as dependências do projeto executando npm install.
Execute o comando serverless deploy para implantar a aplicação na AWS.
Após a implantação ser concluída, a API estará disponível para uso.


### Observações

Certifique-se de que suas credenciais da AWS estão corretamente configuradas para permitir acesso ao DynamoDB.
O scraping é realizado localmente e os dados são armazenados no DynamoDB na nuvem.
A API estará disponível na AWS após a implantação bem-sucedida.
Para mais detalhes sobre a implementação e uso da API, consulte a documentação do Serverless Framework e AWS.
