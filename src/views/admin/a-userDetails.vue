<template>
    <main>
        <div class="user-details-container" v-if="trainer">
        <div class="user-image-container">
          <img v-if="trainer.image" :src="trainer.image" alt="User profile image" class="user-image"/>
          <div v-else class="user-image default-image">No Image</div>
        </div>
        <div class="info-container">
          <div class="info-section">
            <p><strong>ID:</strong> {{ trainer.userid }}</p>
            <p><strong>NAME: </strong> {{ trainer.username }}</p>
            <p><strong>Type: </strong> {{ trainer.usertype }}</p>
            <p><strong>Status: </strong> {{ trainer.userstatus }}</p>
            <p><strong>num: </strong> {{ trainer.tnum}}</p>
            <p><strong>email: </strong> {{ member.email }}</p>
            <p><strong>gender: </strong> {{ member.gender }}</p>
            <p><strong>birth: </strong> {{ member.birth }}</p>
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
import axios from 'axios';
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

    axios.get(`http://localhost/chat_pt/details/${this.$route.params.id}`)
      .then(resp => {
        this.trainer = resp.data[0];
      })
      .catch(error => {
        console.error("Error fetching user details: ", error);
      });

      axios.get(`http://localhost/chat_pt/findList/${this.$route.params.id}`)
      .then(resp => {
        this.member = resp.data;
      })
      .catch(error => {
        console.error("Error fetching user details: ", error);
      });
  }
  ,
  methods: {
  deleteMember() {
    const nnum = this.trainer.nnum;
    const tnum = this.trainer.tnum;
    
    if (nnum != null) 
    {
        if (confirm('회원을 정말 삭제하시겠습니까?')) 
        {
            axios.delete(`http://localhost/chat_pt/nordel/${nnum}`)
            .then(response => {
            alert(response.data);
            this.$router.push('/a_userList')
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
            axios.delete(`http://localhost/chat_pt/ptdel/${tnum}`)
            .then(response => {
            alert(response.data);
            this.$router.push('/a_userList')
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