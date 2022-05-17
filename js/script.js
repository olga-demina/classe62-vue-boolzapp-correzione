dayjs.extend(window.dayjs_plugin_customParseFormat);

const app = new Vue({
  el: "#root",
  data: {
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Ricordati di dargli da mangiare",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            message: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            message: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "received",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            message: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            message: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Luisa",
        avatar: "_4",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
    ],
    currentContact: 0,
    newMessage: "",
    search: "",
    activeMessage: {
      messageIndex: null,
      visible: null,
    },
  },
  computed: {
    currentContactObj() {
      return this.contacts[this.currentContact];
    },
  },
  methods: {
    selectContact(index) {
      this.currentContact = index;
      this.resetMessageMenu();
    },
    sendMessage() {
      const selectedContact = this.contacts[this.currentContact];
      selectedContact.messages.push({
        date: this.getCurrentTime(),
        message: this.newMessage,
        status: "sent",
      });
      this.newMessage = "";
      setTimeout(this.receiveMessage, 1000);
    },
    receiveMessage() {
      const selectedContact = this.contacts[this.currentContact];
      selectedContact.messages.push({
        date: this.getCurrentTime(),
        message: "ok",
        status: "received",
      });
    },
    getCurrentTime() {
      return dayjs().format("DD/MM/YYYY HH:mm:ss");
    },
    filter() {
      this.contacts.forEach((contact) => {
        const contactName = contact.name.toLowerCase();
        const searchName = this.search.toLowerCase();
        if (contactName.includes(searchName)) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      });
    },
    toggleMessageMenu(index) {
      // Se clicco su un messaggio, il menu viene visualizzato
      // Se clicco di nuovo sullo stesso messaggio si nasconde
      // altrimenti se clicco su un'altro messaggio
      // Si nasconde dal messaggio presende e si visualizza nel messaggio cliccato
      if (index === this.activeMessage.messageIndex) {
        // caso click sullo stesso messaggio
        this.activeMessage.visible = !this.activeMessage.visible;
      } else {
        //  clicco su un messaggio diverso
        this.activeMessage.messageIndex = index;
        this.activeMessage.visible = true;
      }
    },
    resetMessageMenu() {
      this.activeMessage.messageIndex = null;
      this.activeMessage.visible = null;
    },
    deleteMessage(index) {
      const selectedContact = this.contacts[this.currentContact];
      selectedContact.messages.splice(index, 1);
      this.resetMessageMenu();
    },
    getLastMessage(contactIndex) {
      const contactMessages = this.contacts[contactIndex].messages;
      return contactMessages.length === 0
        ? ""
        : contactMessages[contactMessages.length - 1];
    },
    getTime(date) {
      const dayjsDate = dayjs(date, "DD/MM/YYYY HH:mm:ss");
      return dayjsDate.format("HH:mm");
    },
  },
});

const date = dayjs("28/03/2020 10:20:10", "DD/MM/YYYY HH:mm:ss");
console.log(date.format("HH:mm"));

// const date = dayjs().format('DD-MM-YYYY');
// console.log(date);
