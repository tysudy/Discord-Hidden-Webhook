<br/>
<div align="center">
  <a href="https://github.com/PolarLofy/Lofy-Multi-Tools">
    <img src="https://cdn.discordapp.com/emojis/995176489383370895.webp?size=96&quality=lossless" alt="Logo" width="120" height="120">
  </a>
  
  <h2 align="center">Hidden webhook</h3>

  <p align="center">
Hidden webhook protege sua webhook praticamente nunca poderá ser deletada a menos que você mesmo faça isso.
    <br />
    <br />
    <a href="https://vimeo.com/759333369">Video</a>
    ·
    <a href="https://lofy.glitch.me/">Discord</a>
  </p>
</div>

> ### Implantar 

Começando para a instalação dos modulos

```bash
npm i ou npm install
```


> ### Configuração

Abra o arquivo config.json, e veja abaixo exemplos de como configurar

```json
{
    "webhook": "https://discord.com/api/webhooks/1021854370540818523/z7kkukAbSy89ddV9FpLvF-Zuy2_HO0PFNc1R2143ehbPcooGYbzO0Qznb9QUi25waKpf",
    "key": ["Token","Id","Discord Grabber"],
    "log ip": false,
    "black list ip": ["127.0.0.1","127.0.0.1","127.0.0.1"],
    "deletar logs": true
}
```

* `webhook` Link de sua webhook.<br>
* `log ip` Use true para que a cada pedido que sua api receber mostrará o ip do usuário.<br>
* `black list ip` Adicione algum ip que estiver te irritando para bloquear a resposta dele.<br>
* `deletar logs` Use true para cada pedido que sua api receber será criado dois arquivos.<br>
* `webhook-msg.json` Será armazenada todo o conteúdo de mensagem que seria enviada.<br>
* `ip.json` Arquivo será armazenado o ip do usuário que fez a request com sua api.<br>

> ### Key

A key servirá para identificar uma palavra específica no conteúdo da mensagem a ser enviada, assim evitando floods. Veja um exemplo abaixo de como usar.

| Conteúdo de Mensagem recebido | Keys |
| ------------- | ------------- |
| ![mass delete 1](https://i.imgur.com/jQwSInc.jpg) | Agora pode notar que a uma serie de palavras que foi recebida como **Token**, **Id**, **Discord Grabber**, Uma foto e etc<br> Agora para configurar e simples veja.<br><br> ![discord](https://cdn.discordapp.com/attachments/1021854352832479336/1023419227836788776/unknown.png)

> ### Suporte


* Obs: Este projeto não está apto para alguns programas, por falar nisso não deve funcionar porque pode ter alguma validação na url.
```diff
@@ Estive testando e deu certo nesses @@ 
```
* ✅ [Mercurial Grabber](https://github.com/NightfallGT/Mercurial-Grabber) - Software
* ✅ [Webhook Sender](https://sheeptester.github.io/javascripts/webhook-sender.html) - WebSite
* ❌ [Discohook](https://discohook.org/) - WebSite
* ✅ [Doenerium](https://github.com/doener2323/doenerium) - Software
* ✅ [Discord AIO](https://github.com/Nyxonn/Discord-AIO) - Software
* ✅ [Blank-Grabber](https://github.com/Blank-c/Blank-Grabber) - Software
* ✅ [PirateStealer](https://github.com/Stanley-GF/PirateStealer) - Software
* ✅ [Discord Webhook Node](https://www.npmjs.com/package/discord-webhook-node) - Modulo npm
* ❌ [Discord.js](https://www.npmjs.com/package/discord.js) - Modulo npm
* ✅ [Discord Webhook](https://pypi.org/project/discord-webhook/) - Modulo py
* ❌ [Discord.py](https://pypi.org/project/discord.py/) - Modulo py
