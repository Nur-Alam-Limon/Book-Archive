const showBook = () => {
  const inputField = document.getElementById("input");
  const input = inputField.value;
  inputField.value = "";

  //   Check if empty
  if (input === "") {
    const result = document.getElementById("result");
    result.textContent = "";
    const searchCount = document.getElementById("search-count");
    searchCount.innerHTML = `
  <h4 class="text-center fw-bold mt-5 text-danger">Please give proper input</h4>
  `;
  } else {
    fetch(`https://openlibrary.org/search.json?q=${input}`)
      .then((res) => res.json())
      .then((data) => displayBook(data));
  }
};

const displayBook = (books) => {
  const result = document.getElementById("result");
  result.textContent = "";

  //   Check if book exist
  if (books.docs.length === 0) {
    const searchCount = document.getElementById("search-count");
    searchCount.innerHTML = `
    <h4 class="text-center text-danger fw-bold mt-5">No Book Found!!</h4>
    `;
  } else {
    const searchCount = document.getElementById("search-count");
    searchCount.innerHTML = `
  <h4 class="text-center fw-bold mt-5">Showing ${books.docs.length} out of ${books.numFound} results</h4>
  `;
  }

  //   Display books
  books.docs.forEach((book) => {
    console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100">
            <img height="350px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top">
            <div class="card-body">
                <h4 class="fw-bold text-center text-success py-2">${book.title}</h4>
                <h5><b>Author:</b> ${book.author_name[0]}</h5>
                <h5><b>Publisher:</b> ${book.publisher[0]}</h5>
                <h5><b>First Publish:</b> ${book.publish_date[0]}</h5>
                
            </div>
        </div>
        `;
    result.appendChild(div);
  });
};
