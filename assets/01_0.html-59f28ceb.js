import{_ as u}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o,c as v,d as e,e as m,a as d,w as n,b,f as t}from"./app-c232e9c1.js";const _="/assets/image-10d506ab.png",p={},h=b('<h2 id="七道题" tabindex="-1"><a class="header-anchor" href="#七道题" aria-hidden="true">#</a> 七道题:</h2><ol><li>合并两个有序链表</li><li>链表的分解</li><li>合并 k 个有序链表</li><li>寻找单链表的倒数第 k 个节点</li><li>寻找单链表的中点</li><li>判断单链表是否包含环并找出环起点</li><li>判断两个单链表是否相交并找出交点</li></ol><h3 id="合并两个有序链表" tabindex="-1"><a class="header-anchor" href="#合并两个有序链表" aria-hidden="true">#</a> 合并两个有序链表</h3>',3),x=e("img",{src:_,alt:"合并两个有序链表",loading:"lazy"},null,-1),L={href:"https://leetcode.cn/problems/merge-two-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},N=e("ul",null,[e("li",null,"非递归")],-1),f=e("div",{class:"language-text line-numbers-mode","data-ext":"text"},[e("pre",{class:"language-text"},[e("code",null,`/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
         ListNode p1 = list1,p2 = list2;
         ListNode m = new ListNode(-1);
         ListNode d = m;
         while(p1 != null && p2 != null){
             if(p1.val > p2.val){
                 d.next = new ListNode(p2.val);
                   p2 = p2.next;
             }else{
                 d.next= new ListNode(p1.val);
                 p1 = p1.next;
             }
              d = d.next;
         }
         if(p1 == null && p2 != null){
             d.next = p2;
         }
         if(p1 != null && p2 == null){
             d.next = p1;
         }
         return m.next;
    }
}
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),g=e("ul",null,[e("li",null,"递归")],-1),w=e("div",{class:"language-text line-numbers-mode","data-ext":"text"},[e("pre",{class:"language-text"},[e("code",null,`class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1 == null) {
            return l2;
        }
        if(l2 == null) {
            return l1;
        }

        if(l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),k=e("p",null,null,-1),T=e("p",null,null,-1);function A(V,y){const r=a("ExternalLinkIcon"),c=a("Tabs");return o(),v("div",null,[h,e("p",null,[x,e("a",L,[m("力扣"),d(r)])]),d(c,{id:"46",data:[{title:"java"},{title:"python"},{title:"go"},{title:"node"},{title:"js"}],active:0},{tab0:n(({title:l,value:i,isActive:s})=>[t(" tab 1 内容 "),N,f,g,w]),tab1:n(({title:l,value:i,isActive:s})=>[t(" tab 2 内容 ")]),tab2:n(({title:l,value:i,isActive:s})=>[t(" tab 3 将会被默认激活 "),t(" tab 3 内容 ")]),tab3:n(({title:l,value:i,isActive:s})=>[k]),tab4:n(({title:l,value:i,isActive:s})=>[T]),_:1})])}const E=u(p,[["render",A],["__file","01_0.html.vue"]]);export{E as default};
