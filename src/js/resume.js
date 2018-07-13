Vue.component('resume',{
    props:['mode','display-resume','resume','editing'],
    data(){
        return {
        }
    },
    methods:{
        addEducation () {
            this.resume.education.push({year:'时间',school:'学校',education:'学历',major:'专业'})
        },
        removeEducation (index) {
            this.resume.education.splice(index, 1)
        },
        addSkill () {
            this.resume.skills.push({name: '请填写技能名称', description: '请填写技能描述'})
        },
        removeSkill (index) {
            this.resume.skills.splice(index, 1)
        },
        addProject () {
            this.resume.projects.push(
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
            )
        },
        removeProject (index) {
            this.resume.projects.splice(index, 1)
        },
        onEdit(key, value){
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match, number) => `.${number}`)
            // key = skills.0.name
            keys = key.split('.')
            let result = this.resume
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    result[keys[i]] = value
                } else {
                    result = result[keys[i]]
                }
            }
        },
    },
    template:`
            <div class="resume">
            <section class="profile">
                <div class="about">
                    <h1>
                        <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.name" @edit="onEdit('name',$event)"></editable-span>
                    </h1>
                    <p>
                       应聘职位: <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.jobTitle" @edit="onEdit('jobTitle',$event)"></editable-span>
                    </p>            
                </div>
                <div class="private">
                 <div>
                   <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-humanmalefemale"></use>
                    </svg>
                    <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.gender" @edit="onEdit('gender',$event)"></editable-span>
  
                </div>
                <div>
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-1002rili"></use>
                    </svg>
                    <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.birthday" @edit="onEdit('birthday',$event)"></editable-span>
                </div>

                 <div>

                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-email"></use>
                    </svg>
                    <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.email" @edit="onEdit('email',$event)"></editable-span>
                 </div>                           
                <div>
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-phone1"></use>
                   </svg>
                   <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.phone" @edit="onEdit('phone',$event)"></editable-span>
                </div>
                </div>
            </section>
            <section class="skills">
            <header>
                   <h2>  
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-tools"></use>
                        </svg>
                        <span>技能</span>
                    </h2>         
                     <span v-if="mode==='edit'" class="add">
                         <span @click="addSkill">
                             <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-add"></use>
                            </svg>
                        </span>
                    </span>              
            </header>

                <ul>
                    <li v-for="skill,index in displayResume.skills">
                    <h3>
                    <div>
                         <svg class="icon dot" aria-hidden="true">
                            <use xlink:href="#icon-dot"></use>
                        </svg>     
                        <editable-span :editing="editing"  :disabled="mode==='preview'" class="name" :value="skill.name"
                         @edit="onEdit('skills['+index+'].name',$event)"></editable-span>                
                    </div>
                     <span v-if="index>=4&&mode==='edit'" @click="removeSkill(index)" class="remove">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-delete"></use>
                        </svg>
                      </span> 
                     </h3>
                    <div class="description">
                         <editable-textarea :editing="editing"  :disabled="mode==='preview'" :value="skill.description" 
                         @edit="onEdit('skills['+index+'].description',$event)">
                         </editable-textarea>
                    </div>
                    </li>
                </ul>
            </section>
            <section class="projects">
            <header>
                 <h2>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gongzuojingyan"></use>
                    </svg>
                <span>项目经历</span>               
                 </h2>  
                  <span v-show="mode==='edit'" class="add">
                       <span @click="addProject">
                        <svg class="icon" aria-hidden="true">
                         <use xlink:href="#icon-add"></use>
                         </svg>
                     </span>  
                     </span>    
            </header>

                <ol>
                    <li v-for="project,index in displayResume.projects">
                    <header>
                        
                        <h3 class="name">
                         <div class="left"> 
                          <svg class="icon dot" aria-hidden="true">
                            <use xlink:href="#icon-dot"></use>
                          </svg>                     
                          <editable-span class="projectName" :editing="editing"  :disabled="mode==='preview'" :value="project.name" @edit="onEdit('projects['+index+'].name',$event)"></editable-span>
                          <editable-span class="keywords" :editing="editing"  :disabled="mode==='preview'" :value="project.keywords" @edit="onEdit('projects['+index+'].keywords',$event)"></editable-span>              
                          </div>
                          <span v-if="index>=2&&mode==='edit'" @click="removeProject" class="remove">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-delete"></use>
                            </svg>
                        </span>
                        </h3>
                              <div class="linkWrapper">                                  
                             <editable-span class="link" :editing="editing"  :disabled="mode==='preview'" :value="project.link" @edit="onEdit('projects['+index+'].link',$event)"></editable-span>                          
                             <a target="_blank" :href="project.link">
                                <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-link1"></use>
                                </svg>
                              </a>                             
                            
                           </div>
                    </header>
                    <p>
                        <editable-textarea :editing="editing"  :disabled="mode==='preview'" :value="project.description" @edit="onEdit('projects['+index+'].description',$event)"></editable-textarea>
                    </p>

                </li>

                </ol>
            </section>
            <section class="education">       
                <header>
                    <h2>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiaoyujingli"></use>
                        </svg>
                        <span>教育经历</span>
                    </h2>
                     <span v-if="mode==='edit'" class="add">
                        <span @click="addEducation">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-add"></use>
                            </svg>
                        </span>
                    </span>               
                </header>                        
                <ul>
                    <li v-for="school,index in displayResume.education">
                        <editable-span class="year" :editing="editing"  :disabled="mode==='preview'" :value="school.year" @edit="onEdit('education['+index+'].year',$event)"></editable-span>
                        <editable-span class="school" :editing="editing"  :disabled="mode==='preview'" :value="school.school" @edit="onEdit('education['+index+'].school',$event)"></editable-span>
                         <editable-span class="major" :editing="editing"  :disabled="mode==='preview'" :value="school.major" @edit="onEdit('education['+index+'].major',$event)"></editable-span>
                         <editable-span class="education" :editing="editing"  :disabled="mode==='preview'" :value="school.education" @edit="onEdit('education['+index+'].education',$event)"></editable-span>
                      
                        <span v-if="index>=1&&mode==='edit'" @click="removeEducation(index)" class="remove">
                             <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-delete"></use>
                             </svg>
                        </span>
                    </li>
    
                </ul>
            </section>
        </div>
        `,

})
