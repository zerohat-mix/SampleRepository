"""Необходимо написать программу, которая вычисляет простые
числа в пределах от 1 до N. N – вводится вручную во время
выполнения программы."""
N = int(input('Введите N = '))

for k in range(2, N ):

    prime = True

    for i in range(2, k):
        if k % i == 0:
            prime = False
            break

    if prime:
        print('{}'.format(k))