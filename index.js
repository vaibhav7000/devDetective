const wrapper=document.querySelector(".wrapper");
const changeModeIcon=document.querySelector(".changeModeIcon")
const modeSwitch=document.querySelector("[modeSwitch]");
const userInfoFull=document.querySelector(".user-info-container");
const userDesc=document.querySelector(".description");
const userImg=document.querySelector("[userImage]");
const name_user=document.querySelector("[name_user]");
const userId=document.querySelector(".userId");

const joinDate=document.querySelector("[joiningDate]");

const portFolioSection=document.querySelector("[portFolioSection]");

const userReach=document.querySelector(".userReach");
const userFolPara=document.querySelector(".parameters");
const totalRepos=document.querySelector("[totalRepos]");

const totalFollowers=document.querySelector("[totalFollowers]");
const totalFollowing=document.querySelector("[totalFollowing]");

const userRegionIdProfile=document.querySelector(".region-id-profile");
const personInfo=document.querySelector(".person-info");
const userlocation=document.querySelector("[location]");
const usertwitter=document.querySelector("[twitter]");
const userwebsite=document.querySelector("[website]");

const userCompany=document.querySelector("[company]");
const formSubmit=document.querySelector(".form-container");
const inputTag=document.querySelector("[searchForm]");

const personregion=document.querySelector(".person-info");
const allMode=document.querySelectorAll(".dark-mode-text");
const API_KEY="https://api.github.com/users/";
const errorPresent=document.querySelector("[error]")
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// let defaultmode="dark";
wrapper.classList.add("dark-mode");
userReach.classList.add("dark-mode");
userInfoFull.classList.add("dark-color");
formSubmit.classList.add("dark-color");


let defaultUser="vaibhav7000";

modeSwitch.addEventListener("click",changeMode);
for(let i=0;i<allMode.length;i++){
    allMode[i].classList.add("dark-mode-text1");
}

portFolioSection.classList.add("dark-mode-text1");
portFolioSection.style.opacity="0.75";
inputTag.style.color="#F6F8FF";

function changeMode(){

    if(wrapper.classList.contains("dark-mode")){
        modeSwitch.innerText="DARK";
        // changeModeIcon.src="";
        // changeModeIcon.src=`./assets/images/sun-icon.svg`;

        wrapper.classList.remove("dark-mode");
        wrapper.classList.add("light-mode");
        userInfoFull.classList.remove("dark-color");
        userReach.classList.remove("dark-mode");
        userInfoFull.classList.add("light-color");
        userReach.classList.remove("dark-mode");
        userReach.classList.add("light-mode");
        formSubmit.classList.remove("dark-color");
        formSubmit.classList.add("light-color");

        for(let i=0;i<allMode.length;i++){
            allMode[i].classList.remove("dark-mode-text1");
        }

        for(let i=0;i<allMode.length;i++){
            allMode[i].classList.add("light-mode-text1");
        } 

        inputTag.style.color="#4b6a9b";
        
    }
    else{
        for(let i=0;i<allMode.length;i++){
            allMode[i].classList.remove("light-mode-text1");
        }

        for(let i=0;i<allMode.length;i++){
            allMode[i].classList.add("dark-mode-text1");
        }

        portFolioSection.classList.add("dark-mode-text1");
        portFolioSection.style.opacity="0.75";
        inputTag.style.color="#F6F8FF";
        
        modeSwitch.innerText="LIGHT";
        // changeModeIcon.src="";
        // changeModeIcon.src=`./assets/images/sun-icon.svg`;
        wrapper.classList.remove("light-mode");
        wrapper.classList.add("dark-mode");
        userInfoFull.classList.remove("light-color");
        userInfoFull.classList.add("dark-color");
        formSubmit.classList.remove("light-color");
        formSubmit.classList.add("dark-color");
        userReach.classList.remove("light-mode");
        userReach.classList.add("dark-mode");
    }
}

searchUser(defaultUser);

async function searchUser(person){
    try {
        let response=await fetch(`https://api.github.com/users/${person}`);
        let data=await response.json();

        renderData(data);
    } catch (err) {
        
    }
}

function renderData(data){
    if(data?.message=="Not Found"){
        // console.log("not-fount");
        errorPresent.style.opacity="1";
        return ;
    }
    else{
        // console.log("found");
        errorPresent.style.opacity="0";
        userImg.src=`${data?.avatar_url}.png`;
        name_user.innerHTML=`${data?.name}`;
        console.log(name_user);
        userId.href=data?.html_url;
        userId.innerText=`@${data?.login}`;
        // joinDate.innerText
        portFolioSection.innerText=`${data?.bio}`;
        totalRepos.innerText=`${data?.public_repos}`;
        totalFollowing.innerText=`${data?.following}`;
        totalFollowers.innerText=`${data?.followers}`;
        userlocation.innerText=`${data?.location}`;
        let date=data?.created_at;

        date=date.substring(0,10);
        let data_array=date.split("-");
        // console.log(data_array);

        joinDate.innerText=`Joined ${data_array[2]} ${months[parseInt(data_array[1])-1]} ${data_array[0]}`;
        if(data?.company==null){
            userCompany.innerText="Not Available";
            userCompany.style.opacity="0.75";
        }
        else{
            userCompany.innerText=`${data?.company}`;
        }

        if(data?.twitter_username==null){
            usertwitter.innerText="Not Available";
            usertwitter.style.opacity="0.75";
        }
        else{
            usertwitter.innerText=`${data?.twitter_username}`;
        }
        if(data?.blog==""){
            userwebsite.innerText="Not Available";
            userwebsite.style.opacity="0.75";
        }
        else{
            userwebsite.innerText=`${data?.blog}`;
        }
    }
}


formSubmit.addEventListener("submit",(e)=>{
    e.preventDefault();

    let user=inputTag.value;

    if(user===""){
        return ;
    }
    else{
        searchUser(user);
    }
});

userwebsite.addEventListener("click",(e)=>{
    let value=userwebsite.innerText;
    console.log(value);
    if(value==="Not Available"){
        e.preventDefault(); 
    }
    else{
        userwebsite.href="";
        userwebsite.href=`#`;
    }
});

usertwitter.addEventListener("click",(e)=>{
    let value=usertwitter.innerHTML;
    if(value==="Not Available"){
        e.preventDefault();
    }
    else{
        usertwitter.href="";
        usertwitter.href=`https://twitter.com/${value}`;
    }
});

