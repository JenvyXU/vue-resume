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
            this.resume.skills.push({name:'New Skill',value:80},)
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
            <div class="profile">
                    <h1>
                        <editable-span class="myname" :editing="editing"  :disabled="mode==='preview'" :value="displayResume.name" @edit="onEdit('name',$event)"></editable-span>
                    </h1>
                    <p>
                       <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.jobTitle" @edit="onEdit('jobTitle',$event)"></editable-span>
                    </p> 
                    <div class="private">
                        <div>
                           <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gender"></use>
                           </svg>
                           <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.gender" @edit="onEdit('gender',$event)"></editable-span>
                         </div>
                        <div>
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#icon-cc-calendar"></use>
                            </svg>
                            <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.birthday" @edit="onEdit('birthday',$event)"></editable-span>
                        </div>    
                        <div>
                            <svg class="icon" aria-hidden="true">
                               <use xlink:href="#icon-location"></use>
                            </svg>
                            <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.location" @edit="onEdit('location',$event)"></editable-span>
                        </div>                    
                    </div>                       
            </div>
            <div class="resumeDown">
                <div class="resumeLeft">
                    <section class="contact">
                        <header>
                        <h2>联系方式</h2>
                        </header>                      
                         <div class="father">       
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-wechat"></use>
                            </svg>
                            <div class="son">
                                <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.wechat" @edit="onEdit('wechat',$event)"></editable-span>
                            </div>
                         </div>
                         
                          <div class="father"> 
                    
                              <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-qq"></use>
                                </svg>
                            
                            
                            <div class="son">
                                <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.qq" @edit="onEdit('qq',$event)"></editable-span>                      
                            </div>
                             </div>
                         <div class="father">       
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-email"></use>
                            </svg>
                            <div class="son">
                                <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.email" @edit="onEdit('email',$event)"></editable-span>                                                 
                            </div>
                               </div>                           
                        <div class="father">
                          <svg class="icon" aria-hidden="true">
                              <use xlink:href="#icon-iphone"></use>
                           </svg>
                           <div class="son">
                                <editable-span :editing="editing"  :disabled="mode==='preview'" :value="displayResume.phone" @edit="onEdit('phone',$event)"></editable-span>
                       
                           </div>
                           </div>
                    </section>
                    <section class="education">       
                <header>
                    <h2>教育经历</h2>
                        <span v-if="mode==='edit'&&editing===true" class="add" @click="addEducation">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-add"></use>
                            </svg>
                        </span>                                                     

                </header>                        
                <ul>
                    <li v-for="school,index in displayResume.education">

                        <h3>
                          <editable-span class="major" :editing="editing"  :disabled="mode==='preview'" :value="school.major" @edit="onEdit('education['+index+'].major',$event)"></editable-span> 
                          
                          &nbsp/&nbsp
                          
                         <editable-span class="education" :editing="editing"  :disabled="mode==='preview'" :value="school.education" @edit="onEdit('education['+index+'].education',$event)"></editable-span> 
                        </h3>
                         <editable-span class="school" :editing="editing"  :disabled="mode==='preview'" :value="school.school" @edit="onEdit('education['+index+'].school',$event)"></editable-span>
                         <editable-span class="year" :editing="editing"  :disabled="mode==='preview'" :value="school.year" @edit="onEdit('education['+index+'].year',$event)"></editable-span>
                          <span v-if="mode==='edit'&&index>=1&&editing===true" @click="removeEducation(index)" class="remove">
                             <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-delete"></use>
                             </svg>
                          </span>  
                    </li>
                </ul>
            </section>
                    <section class="skills"> 
                        <header>
                            <h2>
                                <span>技能</span>
                            </h2> 
                                <span v-if="mode==='edit'&&editing===true" class="add" @click="addSkill">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-add"></use>
                                    </svg>
                                </span>                                                                       
                        </header>          
                            <ul class="processBar">
                                <li v-for="skill,index in displayResume.skills">
                                    <span v-if="index>1&&editing===true" @click="removeSkill(index)" class="remove">
                                        <svg class="icon" aria-hidden="true">
                                           <use xlink:href="#icon-delete"></use>
                                        </svg>
                                    </span>    
                                <h3>
                                    <div> 
                                        <svg class="icon" aria-hidden="true">
                                          <use xlink:href="#icon-dot"></use>
                                        </svg>
                                    
                                        <editable-span :editing="editing"  :disabled="mode==='preview'" class="name" :value="skill.name"
                                         @edit="onEdit('skills['+index+'].name',$event)"></editable-span>                
                                    </div>    
                                    <div class="percentage"> 
                                        <editable-span :editing="editing"  :disabled="mode==='preview'" class="processValue" :value="skill.value"
                                         @edit="onEdit('skills['+index+'].value',$event)"></editable-span> %              
                                    </div>   
                                                    
                                 </h3> 
                                    <div id="process" v-bind:style="{ width: resume.skills[index].value+'%' }"></div> 
                                 </li>
                            </ul>
                    </section>
                </div>                            
                <div class="resumeRight">
<!--                 <section class="skills">
               <header>
                       <h2>  
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-tools"></use>
                            </svg>
                            <span>技能</span>
                        </h2>         
                         <span v-if="mode==='edit'&&editing===true" class="add">
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
                       
                         <span v-if="index>=4&&mode==='edit'&&editing===true" @click="removeSkill(index)" class="remove">
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
                </section>-->
                <section class="aboutme">
                    <header>
                       <h2>自我介绍</h2>
                    </header>
                    <p>
                       <editable-textarea :editing="editing"  :disabled="mode==='preview'" :value="resume.aboutme" @edit="onEdit('aboutme',$event)"></editable-textarea>
                    </p>
                </section>
                <section class="projects">
                    <header>
                             <h2>项目经历</h2>  
                                 <span v-if="mode==='edit'&&editing===true" class="add" @click="addProject">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-add"></use>
                                    </svg>
                                 </span>  
                        </header>
                    <ol>
                                <li v-for="project,index in displayResume.projects">
                                <header>
                                    
                                    <h3 class="name">          
                                      <editable-span class="projectName" :editing="editing"  :disabled="mode==='preview'" :value="project.name" @edit="onEdit('projects['+index+'].name',$event)"></editable-span>
                                      <editable-span class="keywords" :editing="editing"  :disabled="mode==='preview'" :value="project.keywords" @edit="onEdit('projects['+index+'].keywords',$event)"></editable-span>              
                                     <span v-if="mode==='edit'&&index>=2&&editing===true" @click="removeProject(index)" class="remove">
                                         <svg class="icon" aria-hidden="true">
                                             <use xlink:href="#icon-delete"></use>
                                         </svg>
                                     </span>  
                                    </h3>
                                     <div class="linkWrapper">                                  
                                         <editable-span class="link" :editing="editing"  :disabled="mode==='preview'" :value="project.link" @edit="onEdit('projects['+index+'].link',$event)"></editable-span>                                                   
                                      </div>    
                                </header>
                                <p>
                                    <editable-textarea :editing="editing"  :disabled="mode==='preview'" :value="project.description" @edit="onEdit('projects['+index+'].description',$event)"></editable-textarea>
                                </p>
            
                            </li>           
                            </ol>
                </section>
                </div>                                 
            </div>   
        </div>
        `,

})
