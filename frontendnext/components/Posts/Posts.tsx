import React from "react";
import { CardWithStats } from "./CardWithStats";
import { CreatePost } from "./CreatePost/CreatePost";

export function Posts() {
  return (
    <>
      <CardWithStats
        name={"Карточка"}
        text={`Сетевые издания сообщили, что ряд стартапов начал использовать языковую модель GPT-4 от OpenAI, чтобы сэкономить на разработчиках.
                iXBT.com
                По данным издания Vice, которое пообщалось с Перкинсом, тот изучал в школе информатику, но его знаний хватило только на понимание кода, а не на его написание.
                iXBT.com
                А вот сполнительный директор сферы онлайн-образования в Технологическом институте Джорджии Дэвид Джойнер (David Joyner) заявил, что языковые модели вряд ли заменят программистов.
                iXBT.com
                Таким образом, GPT-4 наверняка скоро станет востребованным инструментом на рынке, а разработчикам предстоит научиться использовать его, чтобы быть востребованными.`}
        authorName={"Albert"}
        createAt={undefined}
        id={""}
        updateAt={undefined}
      />
      <CardWithStats
        name={"Карточка"}
        text={`Сетевые издания сообщили, что ряд стартапов начал использовать языковую модель GPT-4 от OpenAI, чтобы сэкономить на разработчиках.
                iXBT.com
                По данным издания Vice, которое пообщалось с Перкинсом, тот изучал в школе информатику, но его знаний хватило только на понимание кода, а не на его написание.
                iXBT.com
                А вот сполнительный директор сферы онлайн-образования в Технологическом институте Джорджии Дэвид Джойнер (David Joyner) заявил, что языковые модели вряд ли заменят программистов.
                iXBT.com
                Таким образом, GPT-4 наверняка скоро станет востребованным инструментом на рынке, а разработчикам предстоит научиться использовать его, чтобы быть востребованными.`}
        authorName={"Albert"}
        createAt={undefined}
        id={""}
        updateAt={undefined}
      />
    </>
  );
}