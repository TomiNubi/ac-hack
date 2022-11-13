function emailCheck (){
    var emailGood = false
    var email = prompt("Enter your email address: ")
    while (emailGood == false) {
        var domain = ["outlook", "gmail", "yahoo", "hotmail"]
        var end = [".com", ".co.uk"]
        if ("@" in email) {
            for (item1 in end) {
                if (item1 == email.slice(email.length-item1.length, email.length)) {
                    emailGood = true
                if (emailGood = true) {
                    for (item2 in domain) {
                        if (item2 == email[email.length - item2.length - item1.length, email.length-item1.length]) {
                            emailGood = True
                            break
                        } else {
                            emailGood = false
                        }
                if (emailGood) {
                    break
                }
                    }
                }
                }
            }
        }
        if (emailGood == false) {
            console.log("Email entered incorrectly")
            email = prompt("Enter your email address: ")
        }
    }
}

