import tensorflow as tf

텐서 = tf.constant(3);
print("ok")
print(텐서)

텐서2 = tf.constant([3,4,5]);
텐서3 = tf.constant([1,2,3]);

addR = tf.add(텐서2, 텐서3);
addT = tf.add(텐서2, 텐서);
print(addR);
print(addT);

가중치 = tf.Variable(2.0);
print(가중치);

# 새로운 가중치 할당
가중치.assign(4.0); 
print(가중치)




import tensorflow as tf

키 = tf.constant(170.0)
신발 = tf.constant(260.0)

a = tf.Variable(0.1)
b = tf.Variable(0.2)

def 손실함수():
    예측값 = 키 * a + b
    return tf.square(신발 - 예측값)

opt = tf.keras.optimizers.Adam(learning_rate=0.1)

# 그래디언트를 계산하기 위해 tf.GradientTape을 사용
with tf.GradientTape() as tape:
    손실 = 손실함수()

# 그래디언트 계산
그래디언트 = tape.gradient(손실, [a, b])

# 그래디언트를 적용하여 변수를 업데이트
opt.apply_gradients(zip(그래디언트, [a, b]))

for i in range(300):
    with tf.GradientTape() as tape:
        손실 = 손실함수()

    # 그래디언트 계산
    그래디언트 = tape.gradient(손실, [a, b])

    # 그래디언트를 적용하여 변수를 업데이트
    opt.apply_gradients(zip(그래디언트, [a, b]))

    print(a.numpy(), b.numpy())

print("옵티마이즈 이후", a.numpy(), b.numpy())
