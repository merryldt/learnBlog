---
title: 二分搜索法
subtitle: 二分搜索法
category:
  - 算法 二分搜索法
tag:
  - 摸鱼
order: 3
---

## 三类:
### 基本的二分查找
### 寻找左侧边界的二分查找
### 寻找又侧边界的二分查找

### 基本的二分查找

::: tabs

@tab:active java

<!-- tab 1 内容 -->
- 非递归
``` java
    public static int binarySearch(int [] nums,int target){
        int left =0,right = nums.length-1;
        while (left<=right){
            int mid = left + (right-left)/2;
            if(nums[mid] == target) return mid;
            else if(nums[mid] < target){
                left = mid+1;
            }else if(nums[mid] > target){
                right = mid-1;
            }
        }
        return -1;
    }
```
- 递归
``` java
    public static <E extends Comparable<E>> int search(int [] arr,int target){
        return search(arr,0,arr.length-1,target);
    }

    public static <E extends Comparable<E>> int search(int [] arr,int l,int r,int target){
        if(l > r) return -1;
        int mid = l + (r-l)/2;
        if(arr[mid]==target) return mid;
        else if(arr[mid] < target) return search(arr,mid+1,r,target);
        else if (arr[mid] > target) return search(arr,l,mid-1,target);
        return -1;
    }
```
:::

**复杂度分析**:
- 递归：
    - 时间复杂度: O(m+n), m 和n 分别为两个链表的长度.每次递归调用都会去掉一个链表的头节点，递归结束的条件是一个链表为空。递归函数只会调用每个节点一次。 
        因此，时间复杂度取决于合并后的链表长度。 即O(m+n)
    - 空间复杂度: O(m+n), 递归调用函数需要栈空间,栈空间的大小取决于递归调用的深度。结束递归时函数对多调用 m +n 次，因此空间复杂度为 O(m+n)
- 非递归：
    - 时间复杂度; O(m+n); 每次循环迭代，两个链表只会有一个元素都被放进合并链表中。因此，while循环的次数不会超过两个链表的长度之和。其他操作都是常数级别。
    - 空间复杂度： O(1)； 只需常数空间存放若干变量。
