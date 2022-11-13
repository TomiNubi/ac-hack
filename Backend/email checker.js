export function emailCheck (email){
    var emailGood = false
    
    var domain = ["outlook", "gmail", "yahoo", "hotmail"]
    var end = [".com", ".co.uk"]
    if (email.includes("@")) {
        for (var item1 in end) {
            if (item1 == email.slice(email.length-item1.length, email.length)) {
                emailGood = true
                for (var item2 in domain) {
                    if (item2 == email.slice(email.length - item2.length - item1.length, email.length-item1.length)) {
                        emailGood = true
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
        if (emailGood == false) {
            console.log("Email entered incorrectly")
           // email = prompt("Enter your email address: ")
        }
    }
}

