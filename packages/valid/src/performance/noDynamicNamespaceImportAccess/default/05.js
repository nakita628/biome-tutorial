import messages from "i18n"
const knownMessagesMap = {
 hello: messages.hello,
 goodbye: messages.goodbye
}

const dynamicKey = "hello"
knownMessagesMap[dynamicKey]
