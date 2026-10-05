/* =====================================================
   STUDENT MANAGEMENT SYSTEM
   Pure HTML + CSS + JavaScript
===================================================== */


/* =====================================================
   DEFAULT DATA
===================================================== */

const defaultStudents = [

    {
        id: 101,
        firstName: "Maheshwari",
        lastName: "",
        email: "maheshwari@gmail.com",
        phone: "9876543210",
        course: "BSc Statistics",
        year: "Third Year",
        status: "Active"
    },

    {
        id: 102,
        firstName: "Rahul",
        lastName: "",
        email: "rahul@gmail.com",
        phone: "9876543211",
        course: "BTech",
        year: "Fourth Year",
        status: "Active"
    },

    {
        id: 103,
        firstName: "Priya",
        lastName: "",
        email: "priya@gmail.com",
        phone: "9876543212",
        course: "BCA",
        year: "Second Year",
        status: "Inactive"
    },

    {
        id: 104,
        firstName: "Arjun",
        lastName: "",
        email: "arjun@gmail.com",
        phone: "9876543213",
        course: "BCom",
        year: "First Year",
        status: "Active"
    },

    {
        id: 105,
        firstName: "Sneha",
        lastName: "",
        email: "sneha@gmail.com",
        phone: "9876543214",
        course: "MBA",
        year: "Second Year",
        status: "Inactive"
    }

];


const defaultCourses = [

    {
        id: 1,
        name: "BSc Statistics",
        code: "BSCSTAT",
        duration: "3 Years",
        department: "Statistics"
    },

    {
        id: 2,
        name: "BTech",
        code: "BTECH",
        duration: "4 Years",
        department: "Engineering"
    },

    {
        id: 3,
        name: "BCA",
        code: "BCA",
        duration: "3 Years",
        department: "Computer Applications"
    },

    {
        id: 4,
        name: "BCom",
        code: "BCOM",
        duration: "3 Years",
        department: "Commerce"
    },

    {
        id: 5,
        name: "MBA",
        code: "MBA",
        duration: "2 Years",
        department: "Management"
    }

];


const defaultMarks = [

    {
        id: 1,
        studentId: 101,
        subject: "Mathematics",
        internal: 35,
        external: 52
    },

    {
        id: 2,
        studentId: 102,
        subject: "Computer Science",
        internal: 37,
        external: 55
    },

    {
        id: 3,
        studentId: 103,
        subject: "English",
        internal: 25,
        external: 40
    }

];


/* =====================================================
   LOCAL STORAGE
===================================================== */

function initializeData() {

    if (!localStorage.getItem("students")) {

        localStorage.setItem(
            "students",
            JSON.stringify(defaultStudents)
        );

    }

    if (!localStorage.getItem("courses")) {

        localStorage.setItem(
            "courses",
            JSON.stringify(defaultCourses)
        );

    }

    if (!localStorage.getItem("marks")) {

        localStorage.setItem(
            "marks",
            JSON.stringify(defaultMarks)
        );

    }

}


initializeData();


function getStudents() {

    return JSON.parse(
        localStorage.getItem("students")
    ) || [];

}


function saveStudents(students) {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


function getCourses() {

    return JSON.parse(
        localStorage.getItem("courses")
    ) || [];

}


function saveCourses(courses) {

    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );

}


function getMarks() {

    return JSON.parse(
        localStorage.getItem("marks")
    ) || [];

}


function saveMarks(marks) {

    localStorage.setItem(
        "marks",
        JSON.stringify(marks)
    );

}


/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const username =
                document.getElementById("username").value;

            const password =
                document.getElementById("password").value;


            const users =
                JSON.parse(
                    localStorage.getItem("users") || "[]"
                );

            const registeredUser =
                users.find(function (user) {
                    return (
                        user.username.toLowerCase() === username.toLowerCase() &&
                        user.password === password
                    );
                });

            if (
                (username === "admin" &&
                password === "admin123") ||
                registeredUser
            ) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );

                window.location.href =
                    "dashboard.html";

            } else {

                alert(
                    "Invalid username or password."
                );

            }

        }
    );

}


function togglePassword() {

    const password =
        document.getElementById("password");

    if (!password) return;

    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type = "password";

    }

}


/* =====================================================
   REGISTER
===================================================== */

function togglePasswordField(fieldId) {

    const field =
        document.getElementById(fieldId);

    if (!field) return;

    field.type =
        field.type === "password" ? "text" : "password";

}


function showRegisterMessage(text, type) {

    const box =
        document.getElementById("registerMessage");

    if (!box) return;

    box.textContent = text;

    box.className = "form-message " + type;

}


const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("regEmail").value.trim();

            const username =
                document.getElementById("regUsername").value.trim();

            const password =
                document.getElementById("regPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const terms =
                document.getElementById("terms").checked;


            if (!fullName || !email || !username || !password) {

                showRegisterMessage(
                    "Please fill in all the fields.",
                    "error"
                );

                return;

            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

                showRegisterMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }

            if (password.length < 6) {

                showRegisterMessage(
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;

            }

            if (password !== confirmPassword) {

                showRegisterMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;

            }

            if (!terms) {

                showRegisterMessage(
                    "Please accept the Terms & Conditions.",
                    "error"
                );

                return;

            }


            const users =
                JSON.parse(
                    localStorage.getItem("users") || "[]"
                );

            const exists =
                username.toLowerCase() === "admin" ||
                users.some(function (user) {
                    return (
                        user.username.toLowerCase() === username.toLowerCase() ||
                        user.email.toLowerCase() === email.toLowerCase()
                    );
                });

            if (exists) {

                showRegisterMessage(
                    "Username or email is already registered.",
                    "error"
                );

                return;

            }


            users.push({
                fullName: fullName,
                email: email,
                username: username,
                password: password
            });

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            showRegisterMessage(
                "Registration successful! Redirecting to login...",
                "success"
            );

            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1500);

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href =
        "logout.html";

}


/* =====================================================
   DASHBOARD
===================================================== */

function loadDashboard() {

    const students = getStudents();

    const courses = getCourses();


    const totalStudents =
        document.getElementById(
            "totalStudents"
        );

    const activeStudents =
        document.getElementById(
            "activeStudents"
        );

    const inactiveStudents =
        document.getElementById(
            "inactiveStudents"
        );

    const totalCourses =
        document.getElementById(
            "totalCourses"
        );


    if (totalStudents) {

        totalStudents.textContent =
            students.length;

    }


    if (activeStudents) {

        activeStudents.textContent =
            students.filter(
                student =>
                    student.status === "Active"
            ).length;

    }


    if (inactiveStudents) {

        inactiveStudents.textContent =
            students.filter(
                student =>
                    student.status === "Inactive"
            ).length;

    }


    if (totalCourses) {

        totalCourses.textContent =
            courses.length;

    }


    const table =
        document.getElementById(
            "recentStudentsTable"
        );


    if (!table) return;


    const recentStudents =
        students.slice(-5).reverse();


    table.innerHTML = "";


    recentStudents.forEach(
        student => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${student.id}</td>

                <td>
                    ${student.firstName}
                    ${student.lastName || ""}
                </td>

                <td>${student.course}</td>

                <td>${student.email}</td>

                <td>
                    <span class="status
                        ${
                            student.status === "Active"
                                ? "active-status"
                                : "inactive-status"
                        }">

                        ${student.status}

                    </span>
                </td>

            `;

            table.appendChild(row);

        }
    );

}


loadDashboard();


/* =====================================================
   STUDENTS PAGE
===================================================== */

function renderStudents(
    students = getStudents()
) {

    const table =
        document.getElementById(
            "studentsTable"
        );


    if (!table) return;


    table.innerHTML = "";


    if (students.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="8"
                    style="text-align:center;padding:40px">

                    No students found.

                </td>

            </tr>

        `;

        return;

    }


    students.forEach(
        student => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${student.id}</td>

                <td>
                    <strong>
                        ${student.firstName}
                        ${student.lastName || ""}
                    </strong>
                </td>

                <td>${student.email}</td>

                <td>${student.phone}</td>

                <td>${student.course}</td>

                <td>${student.year}</td>

                <td>

                    <span class="status
                        ${
                            student.status === "Active"
                                ? "active-status"
                                : "inactive-status"
                        }">

                        ${student.status}

                    </span>

                </td>

                <td>

                    <div class="table-action">

                        <button
                            class="btn btn-small edit-btn"
                            onclick="editStudent(${student.id})">

                            Edit

                        </button>

                        <button
                            class="btn btn-small delete-btn"
                            onclick="deleteStudent(${student.id})">

                            Delete

                        </button>

                    </div>

                </td>

            `;


            table.appendChild(row);

        }
    );

}


renderStudents();


/* =====================================================
   SEARCH STUDENTS
===================================================== */

function searchStudents() {

    const searchInput =
        document.getElementById(
            "studentSearch"
        );


    if (!searchInput) return;


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const students =
        getStudents();


    const filtered =
        students.filter(
            student => {

                const fullName =
                    `${student.firstName}
                     ${student.lastName || ""}`
                        .toLowerCase();


                return (

                    fullName.includes(search) ||

                    student.email
                        .toLowerCase()
                        .includes(search) ||

                    student.course
                        .toLowerCase()
                        .includes(search) ||

                    String(student.id)
                        .includes(search)

                );

            }
        );


    renderStudents(filtered);

}


/* =====================================================
   FILTER STUDENTS
===================================================== */

function filterStudents() {

    const filter =
        document.getElementById(
            "statusFilter"
        );


    if (!filter) return;


    const value =
        filter.value;


    const students =
        getStudents();


    if (value === "all") {

        renderStudents(students);

        return;

    }


    const filtered =
        students.filter(
            student =>
                student.status === value
        );


    renderStudents(filtered);

}


/* =====================================================
   ADD STUDENT
===================================================== */

const studentForm =
    document.getElementById("studentForm");


if (studentForm) {

    const editStudentData =
        localStorage.getItem("editStudent");


    if (editStudentData) {

        const student =
            JSON.parse(editStudentData);


        document.getElementById("firstName").value =
            student.firstName || "";

        document.getElementById("lastName").value =
            student.lastName || "";

        document.getElementById("dob").value =
            student.dob || "";

        document.getElementById("gender").value =
            student.gender || "";

        document.getElementById("email").value =
            student.email || "";

        document.getElementById("phone").value =
            student.phone || "";

        document.getElementById("address").value =
            student.address || "";

        document.getElementById("course").value =
            student.course || "";

        document.getElementById("year").value =
            student.year || "";

        document.getElementById("admissionDate").value =
            student.admissionDate || "";

        document.getElementById("status").value =
            student.status || "Active";


        const submitButton =
            studentForm.querySelector(
                "button[type='submit']"
            );


        if (submitButton) {

            submitButton.textContent =
                "Update Student";

        }

    }


    studentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let students =
                getStudents();


            const editData =
                localStorage.getItem(
                    "editStudent"
                );


            /* =========================
               UPDATE EXISTING STUDENT
            ========================= */

            if (editData) {

                const oldStudent =
                    JSON.parse(editData);


                const index =
                    students.findIndex(
                        student =>
                            Number(student.id) ===
                            Number(oldStudent.id)
                    );


                if (index !== -1) {

                    students[index] = {

                        ...students[index],

                        firstName:
                            document.getElementById(
                                "firstName"
                            ).value.trim(),

                        lastName:
                            document.getElementById(
                                "lastName"
                            ).value.trim(),

                        dob:
                            document.getElementById(
                                "dob"
                            ).value,

                        gender:
                            document.getElementById(
                                "gender"
                            ).value,

                        email:
                            document.getElementById(
                                "email"
                            ).value.trim(),

                        phone:
                            document.getElementById(
                                "phone"
                            ).value.trim(),

                        address:
                            document.getElementById(
                                "address"
                            ).value.trim(),

                        course:
                            document.getElementById(
                                "course"
                            ).value,

                        year:
                            document.getElementById(
                                "year"
                            ).value,

                        admissionDate:
                            document.getElementById(
                                "admissionDate"
                            ).value,

                        status:
                            document.getElementById(
                                "status"
                            ).value

                    };

                }


                saveStudents(students);


                localStorage.removeItem(
                    "editStudent"
                );


                alert(
                    "Student updated successfully!"
                );


                window.location.href =
                    "students.html";


                return;

            }


            /* =========================
               ADD NEW STUDENT
            ========================= */

            const newStudent = {

                id:
                    students.length > 0
                        ? Math.max(
                            ...students.map(
                                student =>
                                    Number(student.id)
                            )
                        ) + 1
                        : 101,

                firstName:
                    document.getElementById(
                        "firstName"
                    ).value.trim(),

                lastName:
                    document.getElementById(
                        "lastName"
                    ).value.trim(),

                dob:
                    document.getElementById(
                        "dob"
                    ).value,

                gender:
                    document.getElementById(
                        "gender"
                    ).value,

                email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "phone"
                    ).value.trim(),

                address:
                    document.getElementById(
                        "address"
                    ).value.trim(),

                course:
                    document.getElementById(
                        "course"
                    ).value,

                year:
                    document.getElementById(
                        "year"
                    ).value,

                admissionDate:
                    document.getElementById(
                        "admissionDate"
                    ).value,

                status:
                    document.getElementById(
                        "status"
                    ).value

            };


            students.push(newStudent);


            saveStudents(students);


            alert(
                "Student added successfully!"
            );


            studentForm.reset();


            window.location.href =
                "students.html";

        }
    );

}


/* =====================================================
   DELETE STUDENT
===================================================== */

function deleteStudent(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmed) return;


    let students =
        getStudents();


    students =
        students.filter(
            student =>
                Number(student.id) !==
                Number(id)
        );


    saveStudents(students);


    let marks =
        getMarks();


    marks =
        marks.filter(
            mark =>
                Number(mark.studentId) !==
                Number(id)
        );


    saveMarks(marks);


    renderStudents();

    alert(
        "Student deleted successfully."
    );

}


/* =====================================================
   EDIT STUDENT
===================================================== */

function editStudent(id) {

    const students =
        getStudents();


    const student =
        students.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!student) return;


    localStorage.setItem(
        "editStudent",
        JSON.stringify(student)
    );


    window.location.href =
        "add-student.html";

}


/* =====================================================
   CHECK EDIT STUDENT
===================================================== */

function loadEditStudent() {

    const editData =
        localStorage.getItem(
            "editStudent"
        );


    if (!editData) return;


    const student =
        JSON.parse(editData);


    const firstName =
        document.getElementById(
            "firstName"
        );


    if (!firstName) return;


    firstName.value =
        student.firstName || "";


    document.getElementById(
        "lastName"
    ).value =
        student.lastName || "";


    document.getElementById(
        "dob"
    ).value =
        student.dob || "";


    document.getElementById(
        "gender"
    ).value =
        student.gender || "";


    document.getElementById(
        "email"
    ).value =
        student.email || "";


    document.getElementById(
        "phone"
    ).value =
        student.phone || "";


    document.getElementById(
        "address"
    ).value =
        student.address || "";


    document.getElementById(
        "course"
    ).value =
        student.course || "";


    document.getElementById(
        "year"
    ).value =
        student.year || "";


    document.getElementById(
        "admissionDate"
    ).value =
        student.admissionDate || "";


    document.getElementById(
        "status"
    ).value =
        student.status || "Active";


    const button =
        document.querySelector(
            "#studentForm button[type='submit']"
        );


    if (button) {

        button.textContent =
            "Update Student";

    }


    document
        .getElementById("studentForm")
        .removeEventListener(
            "submit",
            arguments.callee
        );

}


/* =====================================================
   MARKS
===================================================== */

function loadStudentDropdowns() {

    const students =
        getStudents();


    const marksStudent =
        document.getElementById(
            "marksStudent"
        );


    const marksheetStudent =
        document.getElementById(
            "marksheetStudent"
        );


    if (marksStudent) {

        students.forEach(
            student => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    student.id;


                option.textContent =
                    `${student.id} -
                     ${student.firstName}
                     ${student.lastName || ""}`;


                marksStudent.appendChild(
                    option
                );

            }
        );

    }


    if (marksheetStudent) {

        students.forEach(
            student => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    student.id;


                option.textContent =
                    `${student.id} -
                     ${student.firstName}
                     ${student.lastName || ""}`;


                marksheetStudent.appendChild(
                    option
                );

            }
        );

    }

}


loadStudentDropdowns();


/* =====================================================
   SAVE MARKS
===================================================== */

const marksForm =
    document.getElementById(
        "marksForm"
    );


if (marksForm) {

    marksForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const marks =
                getMarks();


            const internal =
                Number(
                    document.getElementById(
                        "internalMarks"
                    ).value
                );


            const external =
                Number(
                    document.getElementById(
                        "externalMarks"
                    ).value
                );


            const studentId =
                Number(
                    document.getElementById(
                        "marksStudent"
                    ).value
                );


            const subject =
                document.getElementById(
                    "subject"
                ).value;


            const existing =
                marks.find(
                    mark =>
                        Number(mark.studentId) ===
                            studentId &&
                        mark.subject ===
                            subject
                );


            if (existing) {

                existing.internal =
                    internal;

                existing.external =
                    external;

            } else {

                marks.push({

                    id:
                        marks.length > 0
                            ? Math.max(
                                ...marks.map(
                                    mark =>
                                        Number(mark.id)
                                )
                            ) + 1
                            : 1,

                    studentId:
                        studentId,

                    subject:
                        subject,

                    internal:
                        internal,

                    external:
                        external

                });

            }


            saveMarks(marks);


            alert(
                "Marks saved successfully!"
            );


            marksForm.reset();


            renderMarks();

        }
    );

}


/* =====================================================
   GRADE
===================================================== */

function getGrade(total) {

    if (total >= 90)
        return "A+";

    if (total >= 80)
        return "A";

    if (total >= 70)
        return "B";

    if (total >= 60)
        return "C";

    if (total >= 50)
        return "D";

    if (total >= 40)
        return "E";

    return "F";

}


/* =====================================================
   RENDER MARKS
===================================================== */

function renderMarks() {

    const table =
        document.getElementById(
            "marksTable"
        );


    if (!table) return;


    const students =
        getStudents();


    const marks =
        getMarks();


    table.innerHTML = "";


    marks.forEach(
        mark => {

            const student =
                students.find(
                    item =>
                        Number(item.id) ===
                        Number(mark.studentId)
                );


            if (!student) return;


            const total =
                Number(mark.internal) +
                Number(mark.external);


            const grade =
                getGrade(total);


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${student.firstName}
                    ${student.lastName || ""}
                </td>

                <td>
                    ${mark.subject}
                </td>

                <td>
                    ${mark.internal}
                </td>

                <td>
                    ${mark.external}
                </td>

                <td>
                    <strong>
                        ${total}
                    </strong>
                </td>

                <td>
                    <strong>
                        ${grade}
                    </strong>
                </td>

                <td>

                    <button
                        class="btn btn-small delete-btn"
                        onclick="deleteMark(${mark.id})">

                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );

}


renderMarks();


/* =====================================================
   DELETE MARK
===================================================== */

function deleteMark(id) {

    if (
        !confirm(
            "Delete this marks record?"
        )
    ) return;


    let marks =
        getMarks();


    marks =
        marks.filter(
            mark =>
                Number(mark.id) !==
                Number(id)
        );


    saveMarks(marks);

    renderMarks();

}


/* =====================================================
   MARKSHEET
===================================================== */

function generateMarksheet() {

    const select =
        document.getElementById(
            "marksheetStudent"
        );


    const container =
        document.getElementById(
            "marksheetContainer"
        );


    if (!select || !container)
        return;


    const studentId =
        Number(select.value);


    if (!studentId) {

        container.innerHTML = `

            <div class="empty-state">

                <div>📋</div>

                <h3>
                    No Student Selected
                </h3>

                <p>
                    Select a student to generate the marksheet.
                </p>

            </div>

        `;

        return;

    }


    const students =
        getStudents();


    const marks =
        getMarks();


    const student =
        students.find(
            item =>
                Number(item.id) ===
                studentId
        );


    if (!student) return;


    const studentMarks =
        marks.filter(
            mark =>
                Number(mark.studentId) ===
                studentId
        );


    let totalMarks = 0;

    let maxMarks =
        studentMarks.length * 100;


    studentMarks.forEach(
        mark => {

            totalMarks +=
                Number(mark.internal) +
                Number(mark.external);

        }
    );


    const percentage =
        maxMarks > 0
            ? (
                totalMarks /
                maxMarks *
                100
            ).toFixed(2)
            : 0;


    let overallGrade =
        getGrade(
            Number(percentage)
        );


    let rows = "";


    studentMarks.forEach(
        (mark, index) => {

            const total =
                Number(mark.internal) +
                Number(mark.external);


            rows += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${mark.subject}
                    </td>

                    <td>
                        ${mark.internal}
                    </td>

                    <td>
                        ${mark.external}
                    </td>

                    <td>
                        ${total}
                    </td>

                    <td>
                        ${getGrade(total)}
                    </td>

                </tr>

            `;

        }
    );


    container.innerHTML = `

        <div class="marksheet-header">

            <h1>
                STUDENT MARKSHEET
            </h1>

            <p>
                Student Management System
            </p>

        </div>


        <div class="student-details">

            <div class="student-detail">

                <strong>Student ID:</strong>
                ${student.id}

            </div>


            <div class="student-detail">

                <strong>Name:</strong>
                ${student.firstName}
                ${student.lastName || ""}

            </div>


            <div class="student-detail">

                <strong>Course:</strong>
                ${student.course}

            </div>


            <div class="student-detail">

                <strong>Year:</strong>
                ${student.year}

            </div>


            <div class="student-detail">

                <strong>Email:</strong>
                ${student.email}

            </div>


            <div class="student-detail">

                <strong>Status:</strong>
                ${student.status}

            </div>

        </div>


        <div class="table-container">

            <table>

                <thead>

                    <tr>

                        <th>S.No</th>
                        <th>Subject</th>
                        <th>Internal</th>
                        <th>External</th>
                        <th>Total</th>
                        <th>Grade</th>

                    </tr>

                </thead>

                <tbody>

                    ${
                        rows ||
                        `
                        <tr>
                            <td colspan="6"
                                style="text-align:center">

                                No marks available.

                            </td>
                        </tr>
                        `
                    }

                </tbody>

            </table>

        </div>


        <div class="result-summary">

            <div class="result-box">

                <p>
                    Total Marks
                </p>

                <h3>
                    ${totalMarks}/${maxMarks}
                </h3>

            </div>


            <div class="result-box">

                <p>
                    Percentage
                </p>

                <h3>
                    ${percentage}%
                </h3>

            </div>


            <div class="result-box">

                <p>
                    Grade
                </p>

                <h3>
                    ${overallGrade}
                </h3>

            </div>


            <div class="result-box">

                <p>
                    Result
                </p>

                <h3>

                    ${
                        Number(percentage) >= 40
                            ? "PASS"
                            : "FAIL"
                    }

                </h3>

            </div>

        </div>


        <div class="form-actions"
             style="margin-top:25px">

            <button
                class="btn btn-primary"
                onclick="window.print()">

                🖨 Print Marksheet

            </button>

        </div>

    `;

}


/* =====================================================
   COURSES
===================================================== */

function renderCourses() {

    const table =
        document.getElementById(
            "coursesTable"
        );


    if (!table) return;


    const courses =
        getCourses();


    table.innerHTML = "";


    courses.forEach(
        course => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${course.id}
                </td>

                <td>
                    <strong>
                        ${course.name}
                    </strong>
                </td>

                <td>
                    ${course.code}
                </td>

                <td>
                    ${course.duration}
                </td>

                <td>
                    ${course.department}
                </td>

                <td>

                    <button
                        class="btn btn-small delete-btn"
                        onclick="deleteCourse(${course.id})">

                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );

}


renderCourses();


/* =====================================================
   ADD COURSE
===================================================== */

const courseForm =
    document.getElementById(
        "courseForm"
    );


if (courseForm) {

    courseForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const courses =
                getCourses();


            const newCourse = {

                id:
                    courses.length > 0
                        ? Math.max(
                            ...courses.map(
                                course =>
                                    Number(course.id)
                            )
                        ) + 1
                        : 1,

                name:
                    document.getElementById(
                        "courseName"
                    ).value.trim(),

                code:
                    document.getElementById(
                        "courseCode"
                    ).value.trim(),

                duration:
                    document.getElementById(
                        "courseDuration"
                    ).value.trim(),

                department:
                    document.getElementById(
                        "courseDepartment"
                    ).value.trim()

            };


            courses.push(newCourse);

            saveCourses(courses);


            alert(
                "Course added successfully!"
            );


            courseForm.reset();

            renderCourses();

        }
    );

}


/* =====================================================
   DELETE COURSE
===================================================== */

function deleteCourse(id) {

    if (
        !confirm(
            "Are you sure you want to delete this course?"
        )
    ) return;


    let courses =
        getCourses();


    courses =
        courses.filter(
            course =>
                Number(course.id) !==
                Number(id)
        );


    saveCourses(courses);


    renderCourses();

}


/* =====================================================
   SETTINGS
===================================================== */

const settingsForm =
    document.getElementById(
        "settingsForm"
    );


if (settingsForm) {

    settingsForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const adminData = {

                name:
                    document.getElementById(
                        "adminName"
                    ).value,

                email:
                    document.getElementById(
                        "adminEmail"
                    ).value,

                phone:
                    document.getElementById(
                        "adminPhone"
                    ).value

            };


            localStorage.setItem(
                "adminData",
                JSON.stringify(adminData)
            );


            alert(
                "Profile updated successfully!"
            );

        }
    );

}


/* =====================================================
   CHANGE PASSWORD
===================================================== */

const passwordForm =
    document.getElementById(
        "passwordForm"
    );


if (passwordForm) {

    passwordForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const currentPassword =
                document.getElementById(
                    "currentPassword"
                ).value;


            const newPassword =
                document.getElementById(
                    "newPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            if (
                currentPassword !==
                "admin123"
            ) {

                alert(
                    "Current password is incorrect."
                );

                return;

            }


            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "New passwords do not match."
                );

                return;

            }


            if (
                newPassword.length < 6
            ) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;

            }


            alert(
                "Password updated successfully."
            );


            passwordForm.reset();

        }
    );

}


/* =====================================================
   CLEAR ALL DATA
===================================================== */

function clearAllData() {

    const confirmed =
        confirm(
            "WARNING: This will delete all students, marks and courses. Continue?"
        );


    if (!confirmed) return;


    localStorage.removeItem(
        "students"
    );

    localStorage.removeItem(
        "courses"
    );

    localStorage.removeItem(
        "marks"
    );


    initializeData();


    alert(
        "Application data has been reset."
    );


    window.location.reload();

}


/* =====================================================
   PRINT STYLES
===================================================== */

const printStyle =
    document.createElement("style");


printStyle.innerHTML = `

@media print {

    .sidebar,
    .top-header,
    .page-header,
    footer,
    .form-actions,
    .btn {

        display: none !important;

    }

    .main-content {

        margin: 0 !important;

        padding: 0 !important;

    }

    .marksheet-container {

        border: none !important;

        box-shadow: none !important;

    }

    body {

        background: white !important;

    }

}

`;


document.head.appendChild(
    printStyle
);
