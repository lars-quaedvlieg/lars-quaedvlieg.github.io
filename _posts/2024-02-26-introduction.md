---
layout: distill
title: Foundations of Deep Learning Series - Introduction
description: In this series, in which I hope to kick off this blog, I will create detailed posts on the Foundations of Deep Learning reading group at EPFL. This introduction contains information about the content and technicalities.
date: 2024-02-26
tags: paper-review
categories: foundations-of-deep-learning
comments: false

authors:
  - name: Lars C.P.M. Quaedvlieg
    url: "https://en.wikipedia.org/wiki/Albert_Einstein"
    affiliations:
      name: EPFL

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Introduction
  - name: Topics

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

## Introduction

The [Foundations of Deep Learning](https://theory.epfl.ch/readinggroup/) reading group at EPFL is organized by 
[Michael Kapralov](https://theory.epfl.ch/kapralov/) and [Ola Svensson](https://theory.epfl.ch/osven/) from February 
28th to May 29th.

The goal of the group is to delve into recent works that aim to lay down a theoretical foundation for deep 
neural networks, tackling the challenges presented by their significant computational demands, the opacity of their 
outputs, and the privacy concerns they raise. This initiative is driven by the recent advances in machine learning that
have led to notable breakthroughs in fields such as natural language processing and vision.

In this series, I will discuss every session of this meeting group, talking about current advancements in state-of-the-art
deep learning research. I hope to do things like review papers, analyze groundbreaking techniques, and share insights 
on overcoming the challenges that come with deep learning nowadays.

***

## Topics

The reading group will sequentially discuss 4 research topics:
1. **Transformers**: the transformer architecture, as well as (some of) the recent works on subquadratic attention mechanisms (xformers, State Space models, Hyena etc).
   - Basics of the Transformer architecture.
   - Xformers (subquadratic attention mechanisms).
   - More xformers (polysketchformer, hyperattention).
   - State space models.
2. **Which functions can transformers learn**: classes of functions that transformers can provably learn in-context.
   - Which functions can transformers learn in-context (RASP, RASP-L)
   - In-context learning of linear regression, part i.
   - In-context learning of linear regression, part ii.
3. **Graph neural networks**: expressivity of graph neural networks (connections to the Weissfeiler-Lehman test), information bottlenecks in graph neural networks.
   - Graph embeddings.
   - Basics of graph neural networks.
   - Graph neural networks and the Weisfeiler Lehmann test.
4. **Reinforement learning**: algorithmic foundations of reinforcement learning, including Markov Decision Processes and Monte Carlo Tree Search.
   - Reinforcement learning, Markov Decision Processes, Monte-Carlo tree search.
5. **Other**.
   - ADAM.
   - Differentially private training of neural networks.

I am excited to start discussing these topics in greater detail! Check this page regularly for updates!

***
