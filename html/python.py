# Exemplo 1: for com range
for i in range(1, 6):
    print(f"Contagem: {i}")

# Exemplo 2: while
contador = 0
final = int(input('digite o valor final do contador: '))
while contador < final+1:
    print(f"Contador vale: {contador}")
    contador += 1

# Exemplo 3: for percorrendo uma lista
frutas = []
for c in range(1,4,1):
    fruta = input(f'digite a fruta {c}: ')
    frutas.append(fruta)

for c, fruta in enumerate(frutas):
    print(f"{c+1}° Fruta: {fruta}")

# Exemplo 4: break e continue
for numero in range(1, 11):
    if numero == 7:
        break  # para o loop ao chegar em 7
    if numero % 2 == 0:
        continue  # pula números pares
    print(f"Número ímpar: {numero}")