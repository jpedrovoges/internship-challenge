import math

def calculate_mdc(a, b):
    return math.gcd(a, b)

def calculate_mmc(a, b):
    if a == 0 or b == 0:
        return 0
    return abs(a * b) // calculate_mdc(a, b)

def calculate_mmc_interval(x, y):
    if x > y or x <= 0 or y <= 0:
        raise ValueError("Valores de intervalo inválidos para o cálculo.")

    result_mmc = x

    for i in range(x + 1, y + 1):
        result_mmc = calculate_mmc(result_mmc, i)

    return result_mmc