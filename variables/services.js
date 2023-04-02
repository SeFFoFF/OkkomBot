const SERVICES = {
    metalPlasticConstructions: {
        text: "Металопластикові конструкції",
        callbackData: "metalPlasticConstructions",
        types: {
            windows: {
                text: "Вікна",
                callbackData: "windows",
            },
            doors: {
                text: "Двері",
                callbackData: "doors",
            },
            partitions: {
                text: "Перегородки",
                callbackData: "partitions",
            },
            mosquitoNets: {
                text: "Москітні сітки",
                callbackData: "mosquitoNets",
            },
            doubleGlazedWindows: {
                text: "Склопакети",
                callbackData: "doubleGlazedWindows",
            }
        }
    },
    interiorDoor: {
        text: "Міжкімнатні двері",
        callbackData: "interiorDoor"
    },
    protectiveShutters: {
        text: "Захисні ролети",
        callbackData: "protectiveShutters"
    },
    rollerBlinds: {
        text: "Рулонні штори",
        callbackData: "rollerBlinds"
    },
    other: {
        text: "Iнше",
        callbackData: "other"
    }
}

module.exports = SERVICES