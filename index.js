const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
require("dotenv").config();
// const API_KEY = process.env.API_KEY || "7960859804:AAFKOnSrj0JLSOEzEWZbN2x7_EhuoW3_QUY";
const API_KEY = process.env.API_KEY || "7806217113:AAFlIuLrnq3g74zNNEOeSBC3NnJLufl4R-I";
const bot = new TelegramBot(API_KEY, { polling: true });

const domain = "sabong888.net";
const website = "SABONG888";
const telegram_url = "https://t.me/SaBong888_Official";
const telegram_username = "SaBong888_Official";
const followup = "https://sabong888bot.2m-sy.com";

const REGISTER_API = "https://api.kh888.live/api/cs_player/register";
const LOGIN_API = "https://api.kh888.live/api/cs_player/login_v2";
const CAPTION =`សំរាប់ចម្ងល់ឬបញ្ហាផ្សេងៗ នឹង ដាក់/ដក ប្រាក់ ចុចទីនេះ 👉🏻  @${telegram_username}  បញ្ជាក់៖ នេះជាម៉ាសុីនសម្រាប់តែបង្កើតអាខោន មិនចេះឆ្លើយតបទេ។ សូមអរគុណ!`;
const IMAGE_welcome = "https://sabong888.co/upload/1734063288-1724644980-100.jpg";
const IMAGE_88 = "https://sabong888.co/upload/1734063288-1724644980-100.jpg";
const IMAGE_10 = "https://sabong888.co/upload/1734063295-1724644997-10.jpg";
const IMAGE_5 = "https://sabong888.co/upload/1734063301-1724645010-5.jpg";

var domain_b = 'https://kh888.live';
function generateNineDigitNumber() {
    return '0'+Math.floor(100000000 + Math.random() * 900000000);
}

function handleContactCommand(chatId) {
    bot.sendPhoto(chatId, IMAGE_welcome, {
        caption: CAPTION,
        parse_mode: "HTML", // Use HTML formatting for the caption
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "👩‍💻ផ្នែកសេវាកម្ម 24/7", url: "https://t.me/SaBong888_Official" }
                ],
                [   
                    { text: "ការផ្តល់ជូនពិសេស", callback_data: "promo_big" } 
                ]
            ]
        }
    });
}

function getIPAddress() {
    return axios.get('https://api.ipify.org?format=json')
        .then((response) => {
            return response.data.ip; // Return the IP address from the response
        })
        .catch((error) => {
            console.error("Error fetching IP address:", error);
            return '000.000.000.00'; // Fallback IP address in case of error
        });
}
bot.onText(/\/(myaccount|start)/, async (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || "";
    const lastName = msg.from.last_name || "";
    const UserNameCheck = msg.from.username || null;
    const Full_Name = `${firstName}${lastName}`.trim();
    const FullName = Full_Name.replace(/\s+/g, '');
    const Password = msg.from.id;
    const Phone = generateNineDigitNumber();
    getIPAddress().then((IP) => {
        const data_l = {
            'username': String(FullName),
            'password': String(Password),
            'domain': String(domain),
            'clientIP': String(IP),
        };
        const data_r = {
            'domain'    : String(domain),
            'username'  : String(FullName),
            'password'  : String(Password),
            'phone'     : String(Phone),
            'currencyId': String(3),
        };
        axios.post(REGISTER_API, data_r).then(registerResponse => {
            if(registerResponse.data.code == 200){
                const apiUrl = `${followup}/api/register/${encodeURIComponent(Password)}/${encodeURIComponent(UserNameCheck)}`;
                return axios.get(apiUrl).then(() => {
                    axios.post(LOGIN_API, data_l).then(response => {
                        if (response.data.status === 200) {
                            const rehref = `${domain_b}/?token=${response.data.data.token}`;
                            return bot.sendMessage(
                                chatId,
                                `👤ឈ្មោះ‌គណនី: <code>${FullName}</code>\n🔐 លេខសម្ងាត់: <code>${Password}</code>\n🌐 ចូលលេង: <a href="${rehref}">${website}</a>`,
                                { parse_mode: "HTML" }
                            ).then(() => {
                                handleContactCommand(chatId);
                            });
                        }
                        else{
                            console.log(response);
                        }
                    }).catch(error  => {
                        console.error("Registration request failed:", error);
                    });
                });
            }else if(registerResponse.data.error == 'Duplicate username!'){
                axios.post(LOGIN_API, data_l).then(response => {
                    if (response.data.status === 200) {
                        const rehref = `${domain_b}/?token=${response.data.data.token}`;
                        return bot.sendMessage(
                            chatId,
                            `👤ឈ្មោះ‌គណនី: <code>${FullName}</code>\n🔐 លេខសម្ងាត់: <code>${Password}</code>\n🌐 ចូលលេង: <a href="${rehref}">${website}</a>`,
                            { parse_mode: "HTML" }
                        ).then(() => {
                            handleContactCommand(chatId);
                        });
                    }else if(response.data.error =='Invalid username or password!'){
                        bot.sendMessage(
                            chatId,
                            `ឈ្មោះរបស់អ្នកមានរួចហេីយសូមធ្វេីការដូរឈ្មោះតេឡេក្រាមលោកអ្នក!`
                        );
                    }
                    else{
                        console.log(response);
                    }
                }).catch(error  => {
                    console.error("Registration request failed:", error);
                });
            }
        }).catch(error  => {
            console.error("Registration request failed:", error);
        });
    });
       
});
bot.onText(/\/contact/, (msg) => {
    const chatId = msg.chat.id;
    handleContactCommand(chatId);
});
bot.onText(/\/promotion/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 
        `🌟<b>ការផ្តល់ជូនពិសេស ${website}</b> 🌟\n\n 🎁ស្វាគមន៏សមាជិថ្មី 88%\n 🎁ប្រាក់បន្ថែមរៀងរាល់ថ្ងៃ 10%\n 🎁ប្រាក់បង្វិលប្រចាំខែ 5%`, 
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "ស្វាគមន៏សមាជិថ្មី 88%", callback_data: "promo_80" }],
                    [{ text: "ប្រាក់បន្ថែមរៀងរាល់ថ្ងៃ 10%", callback_data: "promo_10" }],
                    [{ text: "ប្រាក់បង្វិលប្រចាំខែ 5%", callback_data: "promo_5" }],
                ]
            }
        }
    );
    
});

bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    if (data === "promo_80") {
        bot.sendPhoto(message.chat.id, IMAGE_88, {
            caption: `🎁ស្វាគមន៏សមាជិថ្មី 80%🧧\n\n - វិលជុំ x7 (ហ្គេមស្លុត)\n - វិលជុំ x13 (ហ្គេមឡាយផ្ទាល់, បាញ់ត្រី)\n - ដាក់ប្រាក់តិចបំផុត $10\n - ដកប្រាក់ធំបំផុត $288`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "👩‍💻ផ្នែកសេវាកម្ម 24/7", url: telegram_url }
                    ]
                ]
            }
        });
    } else if (data === "promo_10") {
        bot.sendPhoto(message.chat.id, IMAGE_10, {
            caption: `🧧ប្រាក់បន្ថែមរៀងរាល់ថ្ងៃ 20%🧧\n\n - វិលជុំ x4 (ហ្គេមស្លុត)\n - វិលជុំ x8 (ហ្គេមឡាយផ្ទាល់, បាញ់ត្រី)\n - ដាក់ប្រាក់តិចបំផុត $10\n - ដកប្រាក់ធំបំផុត $188`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "👩‍💻ផ្នែកសេវាកម្ម 24/7", url: telegram_url }
                    ]
                ]
            }
        });
    } else if (data === "promo_5") {
        bot.sendPhoto(message.chat.id, IMAGE_5, {
            caption: `🧧 ប្រាក់បង្វិលប្រចាំខែ 5%🧧\n\n - វិលជុំ x4 (ហ្គេមស្លុត)\n - វិលជុំ x8 (ហ្គេមឡាយផ្ទាល់, បាញ់ត្រី)\n - ដាក់ប្រាក់តិចបំផុត $10\n - ដកប្រាក់ធំបំផុត $188`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "👩‍💻ផ្នែកសេវាកម្ម 24/7", url: telegram_url }
                    ]
                ]
            }
        });
    } else if (data === "register") {
        bot.sendMessage(message.chat.id, "You clicked on Register Now!");
    } else if (data === "promo_big") {
            bot.sendMessage(message.chat.id, 
            `🌟<b>ការផ្តល់ជូនពិសេស ${website}</b> 🌟\n\n 🎁ស្វាគមន៏សមាជិថ្មី 88%\n 🎁ប្រាក់បន្ថែមរៀងរាល់ថ្ងៃ 10%\n 🎁ប្រាក់បង្វិលប្រចាំខែ 5%`, 
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "ស្វាគមន៏សមាជិថ្មី 88%", callback_data: "promo_80" }],
                        [{ text: "ប្រាក់បន្ថែមរៀងរាល់ថ្ងៃ 10%", callback_data: "promo_10" }],
                        [{ text: "ប្រាក់បង្វិលប្រចាំខែ 5%", callback_data: "promo_5" }],
                    ]
                }
            }
        );
    } 
});
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    handleContactCommand(chatId);
});
const express = require("express");
const { log } = require("console");
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
);