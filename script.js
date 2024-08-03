    //element selects
    const Numbers = document.querySelector('.card-number')
    const numberDivs = document.querySelectorAll('.card-number>*')
    const holder = document.querySelector('.card-holder>.owner')
    const expirationDate = document.querySelector('.expireDate')
    const expiration = document.querySelectorAll('.exp')
    const shadowBox = document.getElementById('shadowBox')
    const allInput = document.querySelectorAll('.number-wrapper>input')
    const holderInput = document.querySelector('.holder-input')
    const expireInput = document.querySelectorAll('.expiration>select')
    const cvv2 = document.querySelector('.cvv2>input')
    const cardCvv2 = document.getElementById('cvv2')
    const cardWrapper = document.querySelector('.card-wrapper')
    const bankImage = document.getElementById('bankImage')
    let inputFlag = 0
    // bank data
    let bankData = [
        {
            id : 0,
            bank : 'sepah',
            preNumbers:'589210',
            url :'img/sepah.jpg',
        },
        {
            id : 1,
            bank : 'pasargad',
            preNumbers:'502229',
            url :'img/pasargad.png',
        },
        {
            id : 2,
            bank : 'Melat',
            preNumbers:'610433',
            url :'img/melat.png',
        },
        {
            id : 3,
            bank : 'Meli',
            preNumbers:'603799',
            url :'img/meli.png',
        },
        {
            id : 4,
            bank : 'keshavarzi',
            preNumbers:'603770',
            url :'img/keshavarzi.png',
        }

    ]

    // bank data
    //card clicks for shadow div
    Numbers.addEventListener('click', numberShadowBox)
    holder.addEventListener('click',holderShadowBox)
    expirationDate.addEventListener('click',expireShadowBox)
    //inputs focus
    allInput.forEach((val)=>{

        val.addEventListener('focus',(e)=>{
            numberShadowBox(val)
            allInput[inputFlag].style.border = '1px solid deepskyblue'
        })
        val.addEventListener('blur',(e)=>{
            e.target.style.border = 'none'
        })
        //border reset

    })
    holderInput.addEventListener('focus',holderShadowBox)
    expireInput[0].addEventListener('focus',expireShadowBox)
    // cvv2 rotation
    cvv2.addEventListener('focus',()=>{
        cardWrapper.classList.add('rotateY')
    })
    cvv2.addEventListener('blur',()=>{
        cardWrapper.classList.remove('rotateY')
        shadowBox.removeAttribute('style')
        shadowBox.classList.replace('opacity-100', 'opacity-0')
    })
    //number inputs validation and going to next input
    allInput.forEach((val,index)=>{
        numberInputValidation(val,index)
    })
    // functions
    function numberShadowBox(val){
    //holder dimensions
    const NumbersWidth = Numbers.clientWidth
    const NumbersHeight = Numbers.clientHeight;
    const NumbersTop = Numbers.offsetTop
    const NumbersLeft = Numbers.offsetLeft
    //moving shadow box
    shadowBox.classList.replace('opacity-0', 'opacity-100')
    shadowBox.style.width = `${NumbersWidth}px`
    shadowBox.style.height = `${NumbersHeight}px`
    shadowBox.style.transform = `translateY(${NumbersTop}px) translateX(${NumbersLeft}px)`
    //input focus when clicked on card
        //creating a loop for focusing on input in this function because if I write input[0].focus it will not go to other inputs
        for(i = 0; i<4;i++){
            allInput[inputFlag].focus()
        }


}
    function holderShadowBox(){
    //holder dimensions
    const holderWidth = holder.clientWidth
    const holderHeight = holder.clientHeight;
    const holderTop = holder.offsetTop
    const holderLeft = holder.offsetLeft
    //moving shadow box
    shadowBox.classList.replace('opacity-0', 'opacity-100')
    shadowBox.style.width = `${holderWidth-10}px`
    shadowBox.style.height = `${holderHeight}px`
    shadowBox.style.transform = `translateY(${holderTop}px) translateX(${holderLeft}px)`
    //focus on holder input
        holder.children[1].classList.add('numberEnter')
    holderInput.focus()
    }

    function expireShadowBox(){
        //holder dimensions
        const expireWidth = expirationDate.clientWidth
        const expireHeight = expirationDate.clientHeight;
        const expireTop = expirationDate.offsetTop
        const expireLeft = expirationDate.offsetLeft
        //moving shadow box
        shadowBox.classList.replace('opacity-0', 'opacity-100')
        shadowBox.style.width = `${expireWidth-10}px`
        shadowBox.style.height = `${expireHeight-10}px`
        shadowBox.style.transform = `translateY(${expireTop}px) translateX(${expireLeft}px)`
        //focus on holder input
        expireInput[0].focus()
    }
    //number Input next focusing
    function numberInputValidation(val,index,e){
        val.addEventListener('keyup',(e)=>{
            let inputValue = val.value
            let inputValueLength = val.value.length
            // after filling the current input focusing on next input
            if(inputValueLength === 4 && index<3){
                inputFlag++
                val.nextElementSibling.focus()
            }
            // on emptying current input focusing on previous input
            if(inputValueLength <1 && index>0 ){
                inputFlag--
                val.previousElementSibling.focus()
            }
            // after filling the 4th number input focusing on holder input
            if(index===3 && inputValueLength===4){
                holderInput.focus()
            }
            // on pressing backspace getting back to previous input
            if(inputValue===null && e.keyCode===8){
                inputFlag--
                val.previousElementSibling.focus()
            }
            // deleting non digit characters
            val.value= val.value.replace(/\D/g,'')
            //replacing numbers of input on card
            numberReplace(val,index,e)
            // checking first 6 numbers and analyze bank data
            let firstSixValue = allInput[0].value +allInput[1].value.slice(0,2)
            bankData.map((bank)=>{
                if(firstSixValue === bank.preNumbers){
                    bankImage.setAttribute('src',bank.url)
                }
            })

        })
    }
    // holder Input coming back to number focuses
    holderInput.addEventListener('keyup',(e)=>{
    if(e.target.value.length <1 && e.keyCode ===8){
        allInput[3].focus()
    }
    })
    // replacing numbers in input on card
    function numberReplace(val,index,e){
        let inputValueLength = val.value.length
        let inputValue = val.value
        let lastSpan = numberDivs[index].children[inputValueLength-1]
        // console.log(lastSpan)
        if(inputValueLength>0){
            lastSpan.innerHTML = allInput[index].value.slice(-1)
            lastSpan.classList.add('numberEnter')
            lastSpan.classList.replace('numberLeave','numberEnter')
        }
        if(inputValueLength>=0 && e.keyCode === 8){
            numberDivs[index].children[inputValueLength].innerHTML='#'
            lastSpan = numberDivs[index].children[inputValueLength]
            lastSpan.classList.replace('numberEnter','numberLeave')
        }
    }
    // replacing holder name
    holderInput.addEventListener('input',()=>{
        holder.children[1].classList.add('numberEnter')
        holder.children[1].innerHTML = holderInput.value

    })
    holderInput.addEventListener('blur',()=>{

        holder.children[1].classList.replace('numberEnter','numberLeave')
    })
    // replacing expiration date
    expireInput[0].addEventListener('change',(e)=>{
        expiration[0].innerHTML = e.target.value
        expiration[0].classList.add('numberEnter')
    })
    expireInput[1].addEventListener('change',(e)=>{
        expiration[1].innerHTML = e.target.value
        expiration[1].classList.add('numberEnter')
    })
    cvv2.addEventListener('input',(e)=>{
        cardCvv2.innerHTML = e.target.value
    })

