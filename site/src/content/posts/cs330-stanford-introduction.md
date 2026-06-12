---
title: "CS-330: Deep Multi-Task and Meta Learning - Introduction"
description: "I have been incredibly interested in the recent wave of multimodal foundation models, especially in robotics and sequential decision-making. Since I never had a formal introduction to this topic, I decided to audit the Deep Multi-Task and Meta Learning course, which is taught yearly by Chelsea Finn at Stanford. I will mainly document my takes on the lectures, hopefully making it a nice read for people who would like to learn more about this topic!"
date: "2024-03-01"
series: "CS-330: Deep Multi-Task and Meta Learning"
categories: "deep-multi-task-and-meta-learning"
tags: "course"
---

## Introduction

The course [CS 330: Deep Multi-Task and Meta Learning](https://cs330.stanford.edu/), by [Chelsea Finn](https://ai.stanford.edu/~cbfinn/), is taught
on a yearly basis and discusses the foundations and current state of multi-task learning and meta learning.

**:warning: Note:** I am discussing the content of the edition in Fall 2023, which no longer includes reinforcement learning.
If you are interested in this, I will be auditing [CS 224R Deep Reinforcement Learning](https://cs224r.stanford.edu/)
later this spring, which is also taught by [Chelsea Finn](https://ai.stanford.edu/~cbfinn/).

In an attempt to improve my writing skills and provide useful summaries/voice my opinions, I have decided to discuss 
the content of every lecture in this blog. In this post, I will give an overview of the course and why it is important 
for AI, especially now.

This course will focus on solving problems that are composed of multiple tasks, and studies how structure that arises from these multiple tasks can be leveraged to learn more efficiently/effectively, including:

- Self-supervised pre-training for downstream few-shot learning and transfer learning.
- Meta-learning methods that aim to learn efficient learning algorithms that can learn new tasks quickly.
- Curriculum and lifelong learning, where the problem requires learning a sequence of tasks, leveraging their shared structure to enable knowledge transfer.

***

## Lectures

The lecture schedule of the course is as follows:
1. [Multi-task learning](/blog/2024/cs330-stanford-mtl/)
2. [Transfer learning & meta learning](/blog/2024/cs330-stanford-tl-ml/)
3. [Black-box meta-learning & in-context learning](/blog/2024/cs330-stanford-bbml-icl/)
4. [Optimization-based meta-learning](/blog/2024/cs330-stanford-obml/)
5. [Few-shot learning via metric learning](/blog/2024/cs330-stanford-fsl-ml/)
6. [Unsupervised pre-training for few-shot learning (contrastive)](/blog/2024/cs330-stanford-upt-fsl-cl/) 
7. [Unsupervised pre-training for few-shot learning (generative)](/blog/2024/cs330-stanford-upt-rbm/)
8. Advanced meta-learning topics (task construction)
9. Variational inference
10. Bayesian meta-learning
11. Advanced meta-learning topics (large-scale meta-optimization)
12. Lifelong learning
13. Domain Adaptation and Domain Generalization
14. Frontiers & Open Challenges

I am excited to start discussing these topics in greater detail! Check this page regularly for updates, since I will 
link to new posts whenever they are available!

***

## Why multi-task and meta-learning?

<figure>
  <img src="/assets/img/blog/cs330/1/robotics_example.png" alt="Figure" loading="lazy" />
</figure>

Robots are embodied in the real world, and must generalize across tasks. In order to do so, they need some common sense 
understanding and supervision can’t be taken for granted.

Earlier robotics and reinforcement research mainly focused on problems that required learning a task from scratch. This 
problem is even present in other fields, such as object detection or speech recognition. However, as opposed to these 
problems, **humans are generalists** that exploit common structures to solve new problems more efficiently.

Going beyond the case of generalist agents, deep multi-task and meta learning useful for any problems where a **common 
structure** can benefit the efficiency or effectiveness of a model. It can be impractical to develop models for each
specific task (e.g. each robot, person, or disease), especially if the data that you have access to for these individual
tasks is **scarce**.

If you need to **quickly learn something new**, you need to utilize prior experiences (e.g. few-shot learning) to make 
decisions.

But why now? Right now, with the speed of research advancements in AI, many researchers are looking into utilizing 
multi-model information to develop their models. Especially in robotics, foundation models seem **the** topic in 2024,
and many advancements have been made in the past year <a href="#ref-1" class="citation">[1]</a>, <a href="#ref-2" class="citation">[2]</a>, <a href="#ref-3" class="citation">[3]</a>, <a href="#ref-4" class="citation">[4]</a>.

***

## What are tasks?

Given a dataset $\mathcal{D}$ and loss function $\mathcal{L}$, we hope to develop a model $f_\theta$. Different tasks 
can be used to train this model, with some simple examples being objects, people, objectives, lighting conditions, 
words, languages, etc.

The **critical assumption** here is that different tasks must share some common structure. However, in practice, this 
is very often the case, even for tasks that seem unrelated. For example the laws of physics and the rules of English
can be shared among many tasks.

1. The multi-task problem: Learn **a set of tasks** more quickly or more proficiently than learning them independently.
2. Given data on previous task(s), learn **a new task** more quickly and/or more proficiently.

> Doesn’t multi-task learning reduce to single-task learning?

This is indeed the case when aggregating data across multiple tasks, which is actually one approach to multi-task 
learning. However, what if you want to learn new tasks? And how do you tell the model which task to do? And what if 
aggregating doesn’t work?

***

## References

<ol class="references-list">
<li id="ref-1">Tony Z Zhao, Vikash Kumar, Sergey Levine, Chelsea Finn. Learning fine-grained bimanual manipulation with low-cost hardware. arXiv preprint arXiv:2304.13705. 2023.</li>
<li id="ref-2">Open X-Embodiment Collaboration, Abhishek Padalkar, Acorn Pooley, Ajinkya Jain, Alex Bewley, Alex Herzog, Alex Irpan, Alexander Khazatsky, Anant Rai, Anikait Singh, Anthony Brohan, Antonin Raffin, Ayzaan Wahid, Ben Burgess-Limerick, Beomjoon Kim, Bernhard Schölkopf, Brian Ichter, Cewu Lu, Charles Xu, Chelsea Finn, Chenfeng Xu, Cheng Chi, Chenguang Huang, Christine Chan, Chuer Pan, Chuyuan Fu, Coline Devin, Danny Driess, Deepak Pathak, Dhruv Shah, Dieter Büchler, Dmitry Kalashnikov, Dorsa Sadigh, Edward Johns, Federico Ceola, Fei Xia, Freek Stulp, Gaoyue Zhou, Gaurav S. Sukhatme, Gautam Salhotra, Ge Yan, Giulio Schiavi, Hao Su, Hao-Shu Fang, Haochen Shi, Heni Ben Amor, Henrik I Christensen, Hiroki Furuta, Homer Walke, Hongjie Fang, Igor Mordatch, Ilija Radosavovic, Isabel Leal, Jacky Liang, Jaehyung Kim, Jan Schneider, Jasmine Hsu, Jeannette Bohg, Jeffrey Bingham, Jiajun Wu, Jialin Wu, Jianlan Luo, Jiayuan Gu, Jie Tan, Jihoon Oh, Jitendra Malik, Jonathan Tompson, Jonathan Yang, Joseph J. Lim, João Silvério, Junhyek Han, Kanishka Rao, Karl Pertsch, Karol Hausman, Keegan Go, Keerthana Gopalakrishnan, Ken Goldberg, Kendra Byrne, Kenneth Oslund, Kento Kawaharazuka, Kevin Zhang, Keyvan Majd, Krishan Rana, Krishnan Srinivasan, Lawrence Yunliang Chen, Lerrel Pinto, Liam Tan, Lionel Ott, Lisa Lee, Masayoshi Tomizuka, Maximilian Du, Michael Ahn, Mingtong Zhang, Mingyu Ding, Mohan Kumar Srirama, Mohit Sharma, Moo Jin Kim, Naoaki Kanazawa, Nicklas Hansen, Nicolas Heess, Nikhil J Joshi, Niko Suenderhauf, Norman Di Palo, Nur Muhammad Mahi Shafiullah, Oier Mees, Oliver Kroemer, Pannag R Sanketi, Paul Wohlhart, Peng Xu, Pierre Sermanet, Priya Sundaresan, Quan Vuong, Rafael Rafailov, Ran Tian, Ria Doshi, Roberto Martín-Martín, Russell Mendonca, Rutav Shah, Ryan Hoque, Ryan Julian, Samuel Bustamante, Sean Kirmani, Sergey Levine, Sherry Moore, Shikhar Bahl, Shivin Dass, Shuran Song, Sichun Xu, Siddhant Haldar, Simeon Adebola, Simon Guist, Soroush Nasiriany, Stefan Schaal, Stefan Welker, Stephen Tian, Sudeep Dasari, Suneel Belkhale, Takayuki Osa, Tatsuya Harada, Tatsuya Matsushima, Ted Xiao, Tianhe Yu, Tianli Ding, Todor Davchev, Tony Z. Zhao, Travis Armstrong, Trevor Darrell, Vidhi Jain, Vincent Vanhoucke, Wei Zhan, Wenxuan Zhou, Wolfram Burgard, Xi Chen, Xiaolong Wang, Xinghao Zhu, Xuanlin Li, Yao Lu, Yevgen Chebotar, Yifan Zhou, Yifeng Zhu, Ying Xu, Yixuan Wang, Yonatan Bisk, Yoonyoung Cho, Youngwoon Lee, Yuchen Cui, Yueh-hua Wu, Yujin Tang, Yuke Zhu, Yunzhu Li, Yusuke Iwasawa, Yutaka Matsuo, Zhuo Xu, Zichen Jeff Cui. Open X-Embodiment: Robotic Learning Datasets and RT-X Models. 2023.</li>
<li id="ref-3">Octo Model Team, Dibya Ghosh, Homer Walke, Karl Pertsch, Kevin Black, Oier Mees, Sudeep Dasari, Joey Hejna, Charles Xu, Jianlan Luo, Tobias Kreiman, You Liang Tan, Dorsa Sadigh, Chelsea Finn, Sergey Levine. Octo: An Open-Source Generalist Robot Policy. 2023.</li>
<li id="ref-4">Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, Tianli Ding, Danny Driess, Avinava Dubey, Chelsea Finn, others. Rt-2: Vision-language-action models transfer web knowledge to robotic control. arXiv preprint arXiv:2307.15818. 2023.</li>
</ol>

