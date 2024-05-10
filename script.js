document.addEventListener("DOMContentLoaded", function() {
    // dibawah ini merupakan kode js, jika ada yang memencet tombol submit yang terdapat dalam tag dengan id myForm
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); //untuk menghentikan perilaku default saat form disubmit (menghindari reload page)
        
        var formIsValid = true; //variabel untuk menyimpan apakah form valid (true) atau tidak (false). nilai awal di set false / tidak valid

        var formFields = this.querySelectorAll('input, select, textarea, radio'); //untuk mengambil semua elemen dalam formulir, baik yang bertipe input, select, textarea, maupun radio
        //looping untuk setiap elemen formulir yang telah diselect di line sebelum ini
        formFields.forEach(function(field) {
            //untuk memeriksa apakah setiap field sudah terisi dan valid
            if (!field.checkValidity()) {
                //jika field tidak valid, nilai variabel formIsValid akan menjadi false dan sistem akan melakukan return / tidak lanjut ke line selanjutnya
                formIsValid = false;
                return;
            }
        });

        //sedangkan jika nilai variabel formIsValid true
        if (formIsValid) {
            //untuk mendapatkan div dengan id newContainer yang sudah disiapkan untuk menampilkan output inputtan form
            var newContainer = document.getElementById("newContainer");

            //untuk mendapatkan nilai dari setiap elemen dalam form sesuai idnya masing-masing
            var fullName = document.getElementById("fname").value;
            var dob = document.getElementById("dob").value;
            var email = document.getElementById("email").value;
            var phoneNumber = document.getElementById("phone").value;
            var gender = document.querySelector('input[name="gender"]:checked').value; //untuk mengambil nilai yang terchecked dari radio dengan nama gender
            var program = document.getElementById("program").value;
            var address = document.getElementById("address").value;
            var motherName = document.getElementById("motherName").value;
            var fatherName = document.getElementById("fatherName").value;
            var photo = document.getElementById("photo").files[0]; //untuk mengambil file gambar

            //untuk membuat objek FileReader agar file gambar dapat dibaca
            var reader = new FileReader();

            //untuk menyiapkan fungsi callback ketika pembacaan selesai
            reader.onloadend = function() {
                //untuk menampilkan data di div newContainer
                newContainer.innerHTML = `
                    <h2>Confirm Your Data!</h2>
                    <!-- div di bawah ditambahkan style agar bisa responsive / jika melebihi lebar layar, maka bisa discroll ke samping -->
                    <div style="overflow-x:auto;">
                    <table>
                        <!-- ini merupakan tabel untuk menampilkan data yang sudah terinput di formulit dengan rapih -->
                        <tr>
                            <td><b>Full Name</b></td>
                            <td>:</td>
                            <td>${fullName}</td>
                        </tr>
                        <tr>
                            <td><b>Date of Birth</b></td>
                            <td>:</td>
                            <td>${dob}</td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>:</td>
                            <td>${email}</td>
                        </tr>
                        <tr>
                            <td><b>Phone Number</b></td>
                            <td>:</td>
                            <td>${phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><b>Gender</b></td>
                            <td>:</td>
                            <td>${gender}</td>
                        </tr>
                        <tr>
                            <td><b>Program of Interest</b></td>
                            <td>:</td>
                            <td>${program}</td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>:</td>
                            <td>${address}</td>
                        </tr>
                        <tr>
                            <td><b>Mother's Name</b></td>
                            <td>:</td>
                            <td>${motherName}</td>
                        </tr>
                        <tr>
                            <td><b>Father's Name</b></td>
                            <td>:</td>
                            <td>${fatherName}</td>
                        </tr>
                        <tr>
                            <td><b>Photo</b></td>
                            <td>:</td>
                            <td><img src="${reader.result}" alt="Photo Chosen" style="width: 30%; height: auto;"></td>
                        </tr>
                    </table>
                    </div>
                    <br>
                    <!-- di bawah merupakan tombol untuk mengkonfirmasi data yang sudah diinput. jika sudah dikonfirmasi, maka formulir akan diperbaharui dan akan kosong kembali, sehingga user dapat menginput formulir baru -->
                    <button onclick="confirmAndReset()">Confirm and Input New Form</button>
                    </div>
                `;
            };

            //untuk membaca file gambar yang dipilih sebagai URL data
            reader.readAsDataURL(photo);

            //untuk mengscroll layar ke div newContainer seperti yang sudah tersimpan dalam var di atas
            newContainer.scrollIntoView({ behavior: 'smooth' });
        } else {
            event.preventDefault(); //untuk menghentikan perilaku default saat form disubmit (menghindari reload page)
        }
    });

    //merupakan event listener untuk memeriksa validitas text field email saat cursor sudah leave dari text field email
    document.getElementById("email").addEventListener("blur", function() {
        var email = this.value;

        if ((email[0] == "@" || email[email.length-1] == "@") || email.indexOf(".") > email.length - 3 || email.indexOf(".") == -1) {
            document.getElementById("emailError").textContent = "Email not valid.";
            this.value = "";
        } else {
            document.getElementById("emailError").textContent = "";
        }
    });

    //merupakan event listener untuk memeriksa validitas text field phone saat cursor sudah leave dari text field phone
    document.getElementById("phone").addEventListener("blur", function() {
        var phone = this.value;
        if (phone.length < 13) {
            document.getElementById("phoneError").textContent = "Phone number not valid.";
            this.value = "";
        } else {
            document.getElementById("phoneError").textContent = "";
        }
    });

    //merupakan event listener untuk memeriksa validitas text field tanggal lahir (dob) agar umur user tidak kurang dari 17 saat tanggal sedang diinput oleh user
    document.getElementById("dob").addEventListener("input", function() {
        var today = new Date();
        var dobValue = new Date(this.value);
        today.setFullYear(today.getFullYear() - 17);

        if (dobValue > today) {
            document.getElementById("dobError").textContent = "Your Age is younger than 17 years old.";
            this.value = "";
        } else {
            document.getElementById("dobError").textContent = "";
        }
    });
});

//function untuk membatasi agar inputan user tidak mengandung huruf, tetapi hanya angka dan simbol "-" untuk inputan nomor telepon
function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 45 // "-" 
        && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

//function untuk membatasi agar inputan user tidak dapat mengandung angka tetapi hanya alfabet baik huruf kecil ataupun huruf besar, dan spasi
function isAlphabetKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (!(charCode >= 65 && charCode <= 90) && // Uppercase letters
        !(charCode >= 97 && charCode <= 122) && // Lowercase letters
        charCode != 32)
    {
        return false;
    }
    return true;
}

//function untuk menampilkan konfirmasi dan reset ulang / mengosongkan formulir
function confirmAndReset() {
    if (confirm("Are you sure you want to submit and input new form?")) {
        var outputDiv = document.getElementById("newContainer");
        //untuk reset formulir
        document.getElementById("myForm").reset();
        //untuk menghapus isi konten div dan meresetnya seperti semula
        outputDiv.innerHTML = `
            <h3 style = "margin-bottom: auto;">Your Inputted Data will goes here!</h3>`;
    }
}
