# SINTAXE
Abaixo estão alguns exemplos de código Meteor.js junto com explicações de cada parte:

1. **Criar um novo projeto Meteor**:
   
   Para criar um novo projeto Meteor, você pode usar o comando `meteor create nome-do-projeto`. Isso criará uma estrutura básica de projeto Meteor.

   ```bash
   meteor create meu-projeto
   ```

2. **Definir uma coleção MongoDB**:

   Para definir uma coleção no banco de dados MongoDB que será usada no Meteor, você pode usar o objeto `Mongo.Collection`.

   ```javascript
   // No arquivo /imports/api/tarefas.js

   export const Tarefas = new Mongo.Collection('tarefas');
   ```

   Isso criará uma coleção chamada "tarefas" no MongoDB que pode ser acessada tanto no lado do cliente quanto no lado do servidor.

3. **Publicar dados do servidor para o cliente**:

   Para publicar dados do servidor para o cliente, você pode usar o método `Meteor.publish`.

   ```javascript
   // No lado do servidor

   Meteor.publish('tarefas', function() {
     return Tarefas.find();
   });
   ```

   Isso publicará todas as tarefas para o cliente.

4. **Assinar uma publicação no cliente**:

   Para assinar uma publicação no cliente e receber os dados no lado do cliente, você pode usar o método `Meteor.subscribe`.

   ```javascript
   // No lado do cliente

   Meteor.subscribe('tarefas');
   ```

   Isso fará com que o cliente receba os dados das tarefas do servidor.

5. **Inserir dados em uma coleção**:

   Para inserir dados em uma coleção MongoDB, você pode usar o método `collection.insert`.

   ```javascript
   // No lado do cliente ou servidor

   Tarefas.insert({ texto: 'Completar tutorial Meteor', criadoEm: new Date() });
   ```

   Isso inserirá uma nova tarefa na coleção de tarefas com um texto e uma data de criação.

6. **Remover dados de uma coleção**:

   Para remover dados de uma coleção MongoDB, você pode usar o método `collection.remove`.

   ```javascript
   // No lado do cliente ou servidor

   Tarefas.remove({ _id: idDaTarefa });
   ```

   Isso removerá a tarefa com o ID especificado da coleção de tarefas.

