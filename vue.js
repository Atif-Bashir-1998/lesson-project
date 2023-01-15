let webstore = new Vue({
  el: "#app",
  data: {
    lessons: [],
    sortBy: "topic",
    sortOrder: "asc",
    cart: [],
    activePage: "lessons",
    name: "",
    phone: "",
    showCheckoutMessage: false,
  },
  methods: {
    togglePage() {
      if (this.activePage === "lessons") {
        this.activePage = "checkout";
      } else {
        this.activePage = "lessons";
      }
    },
    purchaseLesson(lesson, index) {
      let targetLesson = this.lessons[index];

      targetLesson.spaces--; // reduce a space from the target lesson

      // push the purchased lesson into the cart
      this.cart.push(targetLesson);
    },
    removeFromCart(lesson, indexInCart) {
      let index = this.lessons.findIndex((item) => item.id === lesson.id); // getting the index of the lesson in lessons array

      let targetLesson = this.lessons[index];

      targetLesson.spaces++; // increase a space from the target lesson

      // remove the item from cart
      this.cart.splice(indexInCart, 1);

      // if user kept on deleting items and cart get empty, redirect user to lessons page
      if (this.cart.length === 0) {
        this.activePage = "lessons";
      }
    },
    checkout() {
      this.showCheckoutMessage = true;
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
  async mounted () {
    let response = await fetch("http://localhost:3000/api/lesson", {
        method: "GET",
    });
    let data = await response.json();
    this.lessons = data;
  }
});
