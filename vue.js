const API_URL = "http://localhost:3000/api";

let webstore = new Vue({
  el: "#app",
  data: {
    lessons: [],
    sortBy: "topic",
    sortOrder: "asc",
    activePage: "lessons",
    name: "",
    phone: "",
    targetLesson: null,
    // baseUrl: "http://localhost:3000/api",
  },
  methods: {
    togglePage() {
      if (this.activePage === "lessons") {
        this.activePage = "confirm";
      } else {
        this.activePage = "lessons";
      }
    },
    purchaseLesson(lesson) {
      this.targetLesson = lesson;
      this.togglePage();
    },
    cancelLesson() {
      this.targetLesson = null;
      this.togglePage();
    },
    async confirm() {
      await fetch(`${API_URL}/order`, {
        method: "POST",
        body: JSON.stringify({
          name: this.name,
          phone: this.phone,
          lesson_id: this.targetLesson._id,
          spaces: 1,
        }),
      }).then(async (response) => {
        let data = await response.json();
        
        await fetch(`${API_URL}/lesson/${this.targetLesson._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            space: 1,
          }),
        }).then(() => {
          Swal.fire({
            title: "Confirmed!",
            text: `${this.name} Thank you. We will contact you at ${this.phone}. ${data.msg}`,
            icon: "success",
            confirmButtonText: "Cool",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        });
      });
    },
  },
  computed: {
    sortedLessons: function () {
      // if sorting in ascending order
      if (this.sortOrder === "asc") {
        return this.lessons.sort((a, b) =>
          a[this.sortBy] > b[this.sortBy]
            ? 1
            : b[this.sortBy] > a[this.sortBy]
            ? -1
            : 0
        );
      }
      // if sorting in descending order
      return this.lessons.sort((a, b) =>
        a[this.sortBy] > b[this.sortBy]
          ? -1
          : b[this.sortBy] > a[this.sortBy]
          ? 1
          : 0
      );
    },
    canCheckout: function () {
      let isNameCorrect = /^[a-zA-Z\s]*$/.test(this.name); // regex is used to check if name contains letters only
      let isPhoneCorrect = /^[0-9]+$/.test(this.phone) && this.phone.length > 5; // regex is used to check if phone contains number only AND it has more than 5 digits
      return isNameCorrect && isPhoneCorrect;
    },
  },
  async mounted() {
    let response = await fetch(`${API_URL}/lesson`, {
      method: "GET",
    });
    let data = await response.json();
    this.lessons = data;
  },
});
