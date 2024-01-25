<template>
    <main>
        <div class="user-details-container" v-if="trainer">
        <div class="user-image-container">
          <div>
            <img v-if="trainer.timg != null"
           :src="`${this.$s3BaseURL}/trainer/profile_img/${trainer.timg}`"
            alt="Trainer profile image" class="user-image"
            style="width: 300px ; height: 300px;"/>

            <img v-else-if="trainer.userimg != null"
            :src="`${this.$s3BaseURL}/normal_user/profile_img/${trainer.userimg}`"
            alt="User profile image"
            style="width: 300px ; height: 300px;"
            />
            <img v-else class="default-image"/>

          </div>
        </div>
        <div class="info-container">
          <div class="info-section">
            <p><strong>아이디 :</strong> {{ trainer.userid }}</p>
            <p><strong>이름 : </strong> {{ trainer.username }}</p>
            <p><strong>성별: </strong> {{ member.gender }}</p>
            <p><strong>역할 : </strong> {{ trainer.usertype }}</p>
            <p v-if="trainer.usertype==='TRAINER'"><strong>승인 상태: </strong> {{ trainer.userstatus }}</p>
            <p v-if="trainer.usertype==='TRAINER'"><strong>회원번호: </strong> {{ trainer.tnum}}</p>
            <p v-else><strong>회원번호 : </strong> {{ trainer.nnum}}</p>
            <p><strong>생일: </strong> {{ formattingDate(member.birth) }}</p>
            <p><strong>Email: </strong> {{ member.email }}</p>
            <button class="delete-button" @click="deleteMember()">삭제</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>User details not found.</p>
      </div>
    </main>
  </template>
  

<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
    
      trainer: {},
      member : {},
    };
  },
  created() 
  {
    this.$Adminaxios.get(`/MembersDetails/${this.$route.params.id}`)
      .then(resp => {
        console.log(this.$route.params.id);
        this.trainer = resp.data;
        console.log("trainer : " + this.trainer);
      })
      .catch(error => {
        console.error("Error fetching user details: ", error);
      });

      this.$Adminaxios.get(`/MembersFind/${this.$route.params.id}`)
      .then(resp => {
        this.member = resp.data;
        console.log("member : " + this.member);
      })
      .catch(error => {
        console.error("Error fetching user details: ", error);
      });
  }
  ,
  methods: {

    formattingDate(dateValue) {
    const date = new Date(dateValue);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
},


  deleteMember() {
    const nnum = this.trainer.nnum;
    const tnum = this.trainer.tnum;
    
    if (nnum != null) 
    {
        if (confirm('회원을 정말 삭제하시겠습니까?')) 
        {
          this.$Adminaxios.delete(`/nordel/${nnum}`)
            .then(response => {
            alert(response.data);
            this.$router.push('/admin/a_userList')
            })
            .catch(error => {
            console.error('Error deleting the user:', error);
            alert('There was an error deleting the user.');
            });
        }
    }
    else if (tnum != null)
    {
        if (confirm('회원을 정말 삭제하시겠습니까?')) 
        {
          this.$Adminaxios.delete(`/ptdel/${tnum}`)
            .then(response => {
            alert(response.data);
            this.$router.push('/admin/a_userList')
            })
            .catch(error => {
            console.error('Error deleting the user:', error);
            alert('There was an error deleting the user.');
            });
        }
    }
    else{
        alert("삭제에 실패하였습니다.")
        return;
    }

  }
},

}


</script>
<style scoped>
.user-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1000px; /* Adjust as necessary */
  margin: auto;
}

.user-image-container {
  margin-bottom: 20px; /* Adjust as necessary */
}

.user-image {
  width: 200px; /* Adjust as necessary */
  height: 200px; /* Adjust as necessary */
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
}

.default-image {
  width: 200px; /* Adjust as necessary */
  height: 200px; /* Adjust as necessary */
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 1.2rem;
}

.info-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
}

.additional-info {
  background-color: #f0f0f0; /* Slightly different background for contrast */
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; /* Space from the last info paragraph */
}

.delete-button:hover {
  background-color: #ff3333; /* Slightly darker on hover */
}

h1 {
  color: #333;
  border-bottom: 2px solid #333;
  padding-bottom: 5px;
  margin-bottom: 15px; /* Space after the title */
}

p {
  line-height: 1.6;
  margin-bottom: 10px;
}

p strong {
  font-weight: bold;
}
</style>